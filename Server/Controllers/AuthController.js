const passport = require('passport');
const User = require('../Models/User');
const {
    sendRegistrationEmail,
    sendForgotPasswordEmail,
    sendNewEmail,
    sendResendEmail,
} = require('../Services/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const verifyCaptcha = require('../Services/handlerCaptcha');
const generateToken = (expireTime) => {
    return {
        value: crypto.randomBytes(32).toString('hex'),
        created_at: new Date(),
        expires_at: new Date(Date.now() + expireTime),
    };
};

class AuthController {
    async updatePhoneNumber(req, res) {
        try {
            const { userId, phoneNumber } = req.body;

            // Tìm người dùng bằng userId
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Cập nhật số điện thoại
            user.phone_number = phoneNumber;
            await user.save();

            return res.status(200).json({ message: 'Phone number updated successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    // [POST] ~ LOGIN USER
    async loginUser(req, res) {
        try {
            const { usernameOrEmail, password: passwordHashed, tokenCaptcha } = req.body;
            const verifyResponse = await verifyCaptcha(tokenCaptcha);
            if (!verifyResponse.valid) {
                return res
                    .status(verifyResponse.status)
                    .json({ status: verifyResponse.status, message: verifyResponse.message });
            }

            const user = await User.findOne({
                $or: [{ user_name: usernameOrEmail }, { email: usernameOrEmail }],
            });

            if (!user) {
                return res.status(404).json({ message: 'Wrong username or email' });
            }

            const validPassword = await bcrypt.compare(passwordHashed, user.password);
            if (!validPassword) {
                return res.status(404).json({ message: 'Wrong password' });
            }

            // Tạo accessToken và refreshToken
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '15m' });

            const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });
            // Cập nhật cookie isVerifyEmail
            res.cookie('isVerifyEmail', user.is_verified, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });
            const { password, email_verification_token, ...other } = user._doc;
            return res.status(200).json({ ...other, accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    // [POST] ~ REQUEST REFRESH TOKEN
    async requestRefreshToken(req, res) {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(403).json({ message: 'Refresh token is missing' });

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
            const newAccessToken = jwt.sign(
                { _id: decoded._id },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '15m' }, // Thời gian tồn tại của accessToken mới là 15 phút
            );

            const newRefreshToken = jwt.sign(
                { _id: decoded._id },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: '7d' }, // Thời gian tồn tại của refreshToken mới là 7 ngày
            );

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });

            return res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
    // [POST] ~ LOGOUT USER
    async logoutUser(req, res) {
        try {
            res.clearCookie('refreshToken');
            res.clearCookie('isVerifyEmail');
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Erorr Server :', error });
        }
    }
    //
    //[POST] ~ ADD USER
    async addUser(req, res) {
        try {
            const {
                user_name,
                email,
                password,
                full_name,
                type,
                role,
                gender,
                phone_number,
                address,
                avatar,
                date_of_birth,
                id_auth_provider,
                status,
                tokenCaptcha,
            } = req.body;

            // Kiểm tra các trường bắt buộc
            if (!user_name || !email || !password) {
                return res.status(401).json({ message: 'Missing required fields' });
            }

            const verifyResponse = await verifyCaptcha(tokenCaptcha);
            if (!verifyResponse.valid) {
                return res.status(verifyResponse.status).json({ message: verifyResponse.message });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo token xác minh email
            const emailVerificationToken = generateToken(3000 * 1000);
            // Tạo đối tượng user mới
            const newUser = new User({
                user_name,
                email,
                password: hashedPassword,
                full_name,
                type: type || 'WEBSITE',
                role: role || 0,
                gender: gender || '',
                phone_number: phone_number || '',
                address: address || null,
                avatar: avatar || '',
                date_of_birth: date_of_birth || '',
                id_auth_provider: id_auth_provider || undefined,
                is_verified: false,
                email_verification_token: emailVerificationToken,
                status: status || 0,
            });

            // Lưu user vào cơ sở dữ liệu
            const savedUser = await newUser.save();

            // Gửi email xác minh
            await sendRegistrationEmail(email, emailVerificationToken.value);

            return res.status(200).json({ message: 'User added successfully!', user: savedUser });
        } catch (error) {
            console.error('Error adding user:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //[GET] ~ VERIFY EMAIL || NEW EMAIL
    async verifyEmail(req, res) {
        try {
            const { token } = req.query;

            // Tìm người dùng với token
            const user = await User.findOne({ 'email_verification_token.value': token });
            if (!user) {
                return res.status(400).json({ status: 400, message: 'Invalid or expired token' });
                // return res.redirect('/verification-result?status=invalid');
            }

            // Kiểm tra token hết hạn
            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
                // return res.redirect('/verification-result?status=expired');
            }

            // Xác minh tài khoản
            user.is_verified = true;
            user.email_verification_token = undefined; // Xóa token
            await user.save();

            return res.status(200).json({ status: 200, message: 'Email Verify successfully!' });
            // return res.redirect('/verification-result?status=success');
        } catch (error) {
            console.error('Error verifying email:', error);
            return res.status(500).json({ status: 500, message: 'Internal server error', error });
        }
    }

    //[GET] ~ ONLY VERIFY SEND EMAIL
    async verifyResendEmail(req, res) {
        try {
            const { token } = req.query;

            // Tìm người dùng với token
            const user = await User.findOne({ 'email_verification_token.value': token });
            if (!user) {
                return res.status(400).json({ status: 400, message: 'Invalid or expired token' });
                // return res.redirect('/verification-result?status=invalid');
            }

            // Kiểm tra token hết hạn
            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
                // return res.redirect('/verification-result?status=expired');
            }

            // Xác minh tài khoản
            user.is_verified = true;
            user.email_verification_token = undefined; // Xóa token
            await user.save();

            // Cập nhật cookie isVerifyEmail
            res.cookie('isVerifyEmail', user.is_verified, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });

            return res.status(200).json({ status: 200, message: 'Email Verify successfully!' });
            // return res.redirect('/verification-result?status=success');
        } catch (error) {
            console.error('Error verifying email:', error);
            return res.status(500).json({ status: 500, message: 'Internal server error', error });
        }
    }

    //~FORGOT PASSOWRD
    async forgotPassword(req, res) {
        try {
            const { usernameOrEmail } = req.body;
            const user = await User.findOne({
                $or: [{ email: usernameOrEmail }, { user_name: usernameOrEmail }],
            });

            if (!user) {
                return res.status(400).json({ message: 'User with given email or username does not exist' });
            }

            // Tạo token quên mật khẩu
            const forgotPasswordToken = generateToken(3000 * 1000);

            // Cập nhật token quên mật khẩu cho người dùng
            user.forgot_password_token = forgotPasswordToken;
            await user.save();

            // Gửi email quên mật khẩu
            await sendForgotPasswordEmail(user.email, forgotPasswordToken.value);

            return res.status(200).json({ message: 'Password reset email sent successfully!' });
        } catch (error) {
            console.error('Error in forgotPassword:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    //[GET] ~ VERIFY PASSOWORD
    async verifyForgotPassword(req, res) {
        try {
            const { token } = req.query;
            const user = await User.findOne({ 'forgot_password_token.value': token });

            if (!user) {
                return res.status(400).json({ status: 400, message: 'Invalid or expired token' });
                // return res.redirect('/passwordResult?status=failed');
            }

            // Kiểm tra token hết hạn
            if (new Date(user.forgot_password_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
                // return res.redirect('/passwordResult?status=expired');
            }

            // user.forgot_password_token = undefined;
            // await user.save();

            return res.status(200).json({ status: 200, message: 'Password reset successfully!' });
            // return res.redirect('/passwordResult?status=success');
        } catch (error) {
            console.error('Error in resetPassword:', error);
            return res.status(500).json({ status: 500, message: 'Internal server error', error });
        }
    }
    //[POST] ~ Update Passowrd (Client Resquest)
    async updatePassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            // Tìm người dùng bằng token
            const user = await User.findOne({ 'forgot_password_token.value': token });

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            // Kiểm tra token hết hạn
            if (new Date(user.forgot_password_token.expires_at) < new Date()) {
                return res.status(400).json({ message: 'Token has expired' });
            }

            // Hash mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu mới và xóa token
            user.password = hashedPassword;
            user.forgot_password_token = undefined;
            await user.save();

            return res.status(200).json({ message: 'Password updated successfully!' });
        } catch (error) {
            console.error('Error updating password:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //[GET] ~ Resend Resgister Email || Email
    async resendVerifyRegistrationEmail(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            // Kiểm tra người dùng với email đã tồn tại chưa
            if (!user) {
                return res.status(400).json({ message: 'Người dùng với email này không tồn tại' });
            }

            // Kiểm tra xem người dùng đã được xác minh hay chưa
            if (user.is_verified) {
                return res.status(400).json({ message: 'Người dùng đã được xác minh' });
            }

            // Tạo mã xác minh email mới
            const emailVerificationToken = generateToken(3000 * 1000);

            // Cập nhật mã xác minh email cho người dùng
            user.email_verification_token = emailVerificationToken;
            await user.save();

            // Gửi email xác minh mới
            await sendResendEmail(email, emailVerificationToken.value);

            return res.status(200).json({ message: 'Gửi lại email xác minh thành công!' });
        } catch (error) {
            console.error('Lỗi khi gửi lại email xác minh:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error });
        }
    }

    // [POST] ~ Resend Forgot Password Email
    async resendForgotPasswordEmail(req, res) {
        try {
            const { usernameOrEmail } = req.body;
            const user = await User.findOne({
                $or: [{ email: usernameOrEmail }, { user_name: usernameOrEmail }],
            });

            // Kiểm tra người dùng với email hoặc tên người dùng đã tồn tại chưa
            if (!user) {
                return res.status(400).json({ message: 'User with given email or username does not exist' });
            }

            // Tạo token quên mật khẩu mới
            const forgotPasswordToken = generateToken(30 * 1000);

            // Cập nhật token quên mật khẩu cho người dùng
            user.forgot_password_token = forgotPasswordToken;
            await user.save();

            // Gửi email quên mật khẩu
            await sendForgotPasswordEmail(user.email, forgotPasswordToken.value);

            return res.status(200).json({ message: 'Password reset email sent successfully!' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    //[POST]~   REQUEST CHANGE EMAIL
    async changeEmail(req, res) {
        try {
            const { email, newEmail } = req.body;

            // Tìm người dùng bằng email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User with given email does not exist' });
            }

            // Tạo token xác minh email mới
            const emailVerificationToken = generateToken(30 * 1000);

            user.new_email = newEmail;
            // Cập nhật token xác minh email mới cho người dùng
            user.email_verification_token = emailVerificationToken;
            await user.save();

            // Gửi email xác minh mới
            await sendNewEmail(newEmail, emailVerificationToken.value);

            return res.status(200).json({ message: 'New email verification sent!' });
        } catch (error) {
            console.error('Error in requestNewEmailVerification:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //[GET]~ Verify CHANGE EMAIL
    async verifyChangeEmail(req, res) {
        try {
            const { token } = req.query;
            const user = await User.findOne({ 'email_verification_token.value': token });

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' });
                // return res.redirect('/newEmail?status=failed');
            }

            // Kiểm tra token hết hạn
            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ message: 'Token has expired' });
                // return res.redirect('/newEmail?status=expired');
            }

            // Xác minh email mới
            user.email = user.new_email;
            user.new_email = undefined;
            user.email_verification_token = undefined; // Xóa token
            await user.save();

            return res.status(200).json({ message: 'New email verified and updated successfully!' });
            // return res.redirect('/newEmail?status=success');
        } catch (error) {
            console.error('Error verifying new email:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //[GET] ~ Resend Verify Email
    async resendVerifyChangeEmail(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            // Kiểm tra người dùng với email đã tồn tại chưa
            if (!user) {
                return res.status(400).json({ message: 'Người dùng với email này không tồn tại' });
            }

            // Kiểm tra xem người dùng đã được xác minh hay chưa
            if (user.is_verified) {
                return res.status(400).json({ message: 'Người dùng đã được xác minh' });
            }

            // Tạo mã xác minh email mới
            const emailVerificationToken = generateToken(30 * 1000);

            // Cập nhật mã xác minh email cho người dùng
            user.email_verification_token = emailVerificationToken;
            await user.save();

            // Gửi email xác minh mới
            await sendNewEmail(user.new_email, emailVerificationToken.value);

            return res.status(200).json({ message: 'Gửi lại email xác minh thành công!' });
        } catch (error) {
            console.error('Lỗi khi gửi lại email xác minh:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error });
        }
    }

    //[GET]
    async checkUsername(req, res) {
        try {
            const { username } = req.query;
            const user = await User.findOne({ user_name: username });

            if (user) {
                return res.status(200).json({ exists: true, message: 'Username is already taken' });
            }

            return res.status(200).json({ exists: false, message: 'Username is available' });
        } catch (error) {
            console.error('Error checking username:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    //[GET]
    async checkEmail(req, res) {
        try {
            const { email } = req.query;
            const user = await User.findOne({ email });

            if (user) {
                return res.status(200).json({ exists: true, message: 'Email is already taken' });
            }

            return res.status(200).json({ exists: false, message: 'Email is available' });
        } catch (error) {
            console.error('Error checking email:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    //[POST] ~ CHANGE PASSWORD
    async changePassword(req, res) {
        try {
            const { email, currentPassword, newPassword } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Kiểm tra mật khẩu hiện tại
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Kiểm tra nếu mật khẩu mới giống với mật khẩu hiện tại
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(401).json({ message: 'New password cannot be the same as the current password' });
            }

            // Hash mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu mới
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: 'Password changed successfully!' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //FOR GOOOGLE
    async loginGoogle(req, res, next) {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    async loginRedirect(req, res) {
        passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
            // Successful authentication
            res.redirect('/'); // Redirect to the homepage or any other desired location
        });
    }
}
module.exports = new AuthController();

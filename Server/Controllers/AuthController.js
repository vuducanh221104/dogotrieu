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
const verifyCaptcha = require('../Services/handlerCaptcha');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_APP_ID);

const generateToken = (expireTime) => {
    return {
        value: crypto.randomBytes(32).toString('hex'),
        created_at: new Date(),
        expires_at: new Date(Date.now() + expireTime),
    };
};

class AuthController {
    //[PATCH]
    async updateInfoUser(req, res) {
        try {
            const { userId, phoneNumber, full_name } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            let isUpdated = false;

            if (phoneNumber !== undefined && phoneNumber !== user.phone_number) {
                user.phone_number = phoneNumber;
                isUpdated = true;
            }

            if (full_name !== undefined && full_name !== user.full_name) {
                user.full_name = full_name;
                isUpdated = true;
            }

            if (isUpdated) {
                await user.save();
            }

            return res.status(200).json({
                message: isUpdated ? 'Updated successfully' : 'No changes made',
                user: {
                    phone_number: user.phone_number,
                    full_name: user.full_name,
                },
            });
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

            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });

            const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });
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
                { expiresIn: '30m' }, // Thời gian tồn tại của accessToken mới là 15 phút
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

            if (!user_name || !email || !password) {
                return res.status(401).json({ message: 'Missing required fields' });
            }

            const verifyResponse = await verifyCaptcha(tokenCaptcha);
            if (!verifyResponse.valid) {
                return res.status(verifyResponse.status).json({ message: verifyResponse.message });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo token xác minh email
            const emailVerificationToken = generateToken(30 * 60 * 1000);
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
            }

            // Kiểm tra token hết hạn
            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
            }

            user.is_verified = true;
            user.email_verification_token = undefined;
            await user.save();

            if (user.type === 'GOOGLE') {
                res.cookie('isVerifyEmail', user.is_verified, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                    sameSite: 'strict',
                });
            }
            return res.status(200).json({ status: 200, message: 'Email Verify successfully!', type: user.type });
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
            }

            // Kiểm tra token hết hạn
            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
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

            // Kiểm tra nếu tài khoản được tạo bằng Google
            if (user.type === 'GOOGLE') {
                return res.status(403).json({
                    message: 'This account was created with Google. Please use Google Sign-In instead.',
                    type: 'GOOGLE',
                });
            }

            const forgotPasswordToken = generateToken(30 * 60 * 1000);

            user.forgot_password_token = forgotPasswordToken;
            await user.save();

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
            }

            // Kiểm tra token hết hạn
            if (new Date(user.forgot_password_token.expires_at) < new Date()) {
                return res.status(400).json({ status: 400, message: 'Token has expired' });
            }

            user.forgot_password_token = undefined;
            await user.save();

            return res.status(200).json({ status: 200, message: 'Password reset successfully!' });
        } catch (error) {
            console.error('Error in resetPassword:', error);
            return res.status(500).json({ status: 500, message: 'Internal server error', error });
        }
    }
    //[POST] ~ Update Passowrd (Client Resquest)
    async updatePassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            const user = await User.findOne({ 'forgot_password_token.value': token });

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            if (new Date(user.forgot_password_token.expires_at) < new Date()) {
                return res.status(400).json({ message: 'Token has expired' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

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

            if (!user) {
                return res.status(400).json({ message: 'Người dùng với email này không tồn tại' });
            }

            if (user.is_verified) {
                return res.status(400).json({ message: 'Người dùng đã được xác minh' });
            }

            const emailVerificationToken = generateToken(30 * 60 * 1000);

            user.email_verification_token = emailVerificationToken;
            await user.save();

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

            if (!user) {
                return res.status(400).json({ message: 'User with given email or username does not exist' });
            }

            const forgotPasswordToken = generateToken(30 * 60 * 1000);

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

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User with given email does not exist' });
            }

            const emailVerificationToken = generateToken(30 * 60 * 1000);

            user.new_email = newEmail;
            user.email_verification_token = emailVerificationToken;
            await user.save();

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
            }

            if (new Date(user.email_verification_token.expires_at) < new Date()) {
                return res.status(400).json({ message: 'Token has expired' });
            }

            user.email = user.new_email;
            user.new_email = undefined;
            user.email_verification_token = undefined;
            await user.save();

            return res.status(200).json({ message: 'New email verified and updated successfully!' });
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

            if (!user) {
                return res.status(400).json({ message: 'Người dùng với email này không tồn tại' });
            }

            if (user.is_verified) {
                return res.status(400).json({ message: 'Người dùng đã được xác minh' });
            }

            const emailVerificationToken = generateToken(30 * 60 * 1000);

            user.email_verification_token = emailVerificationToken;
            await user.save();

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

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(401).json({ message: 'New password cannot be the same as the current password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: 'Password changed successfully!' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    //FOR GOOOGLE
    // async loginGoogle(req, res, next) {
    //     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    // }

    // async loginRedirect(req, res) {
    //     passport.authenticate('google', {
    //         failureRedirect: `http://localhost:3000/auth/login`,
    //         session: false,
    //     })(req, res, async () => {
    //         try {
    //             if (!req.user) {
    //                 return res.redirect(`http://localhost:3000/auth/google?error=google_auth_failed`);
    //             }

    //             const accessToken = jwt.sign({ _id: req.user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
    //             const refreshToken = jwt.sign({ _id: req.user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });

    //             res.cookie('refreshToken', refreshToken, {
    //                 httpOnly: true,
    //                 secure: process.env.NODE_ENV === 'production',
    //                 path: '/',
    //                 sameSite: 'strict',
    //                 maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //             });

    //             res.cookie('isVerifyEmail', req.user.is_verified, {
    //                 httpOnly: false,
    //                 secure: process.env.NODE_ENV === 'production',
    //                 path: '/',
    //                 sameSite: 'strict',
    //                 maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //             });

    //             // Prepare user info for client
    //             const { password, email_verification_token, ...otherDetails } = req.user.toObject();
    //             const userInfo = {
    //                 ...otherDetails,
    //                 accessToken,
    //             };

    //             // Encode user info for URL
    //             const encodedUserInfo = encodeURIComponent(JSON.stringify(userInfo));

    //             return res.redirect(`http://localhost:3000/auth/google?userInfo=${encodedUserInfo}`);
    //         } catch (error) {
    //             console.error('Google login error:', error);
    //             return res.redirect(`http://localhost:3000/auth/google?error=google_auth_failed`);
    //         }
    //     });
    // }

    async verifyGoogleToken(req, res) {
        try {
            const { credential } = req.body;

            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_APP_ID,
            });

            const payload = ticket.getPayload();

            let user = await User.findOne({
                $or: [{ email: payload.email }, { id_auth_provider: payload.sub }],
            });

            if (!user) {
                const emailVerificationToken = generateToken(30 * 60 * 1000);

                user = new User({
                    user_name: `google_${payload.sub}`,
                    email: payload.email,
                    full_name: payload.name,
                    type: 'GOOGLE',
                    avatar: '',
                    id_auth_provider: payload.sub,
                    is_verified: false,
                    status: 1,
                    email_verification_token: emailVerificationToken,
                });
                await user.save();

                await sendRegistrationEmail(payload.email, emailVerificationToken.value);
            }

            const accessToken = jwt.sign({ id: user._id, admin: user.admin }, process.env.JWT_ACCESS_KEY, {
                expiresIn: '30m',
            });

            const refreshToken = jwt.sign({ id: user._id, admin: user.admin }, process.env.JWT_REFRESH_KEY, {
                expiresIn: '7d',
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.cookie('isVerifyEmail', user.is_verified, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            const { password, email_verification_token, ...otherDetails } = user.toObject();
            return res.status(200).json({
                ...otherDetails,
                accessToken,
            });
        } catch (error) {
            console.error('Google auth error:', error);
            return res.status(401).json({ message: 'Invalid Google token' });
        }
    }

    // [POST] ~ LOGIN ADMIN
    async loginAdmin(req, res) {
        try {
            const { usernameOrEmail, password: passwordHashed, tokenCaptcha } = req.body;

            // Verify captcha
            const verifyResponse = await verifyCaptcha(tokenCaptcha);
            if (!verifyResponse.valid) {
                return res
                    .status(verifyResponse.status)
                    .json({ status: verifyResponse.status, message: verifyResponse.message });
            }

            // Tìm user
            const user = await User.findOne({
                $or: [{ user_name: usernameOrEmail }, { email: usernameOrEmail }],
            });

            // Kiểm tra user tồn tại
            if (!user) {
                return res.status(404).json({ message: 'Invalid credentials or insufficient permissions' });
            }

            // Kiểm tra password
            const validPassword = await bcrypt.compare(passwordHashed, user.password);
            if (!validPassword) {
                return res.status(404).json({ message: 'Invalid credentials or insufficient permissions' });
            }

            // Kiểm tra role
            if (!user.role || user.role <= 0) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            // Tạo tokens
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });

            // Set cookie
            res.cookie('refreshTokenAdmin', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });

            // Trả về thông tin user (loại bỏ password và token)
            const { password, email_verification_token, ...other } = user._doc;
            return res.status(200).json({ ...other, accessToken });
        } catch (error) {
            console.error('Admin login error:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // [POST] ~ REQUEST REFRESH TOKEN ADMIN
    async requestRefreshTokenAdmin(req, res) {
        const { refreshTokenAdmin } = req.cookies;
        if (!refreshTokenAdmin) return res.status(403).json({ message: 'Refresh token is missing' });

        try {
            const decoded = jwt.verify(refreshTokenAdmin, process.env.JWT_REFRESH_KEY);

            // Tìm user và kiểm tra role
            const user = await User.findById(decoded._id);
            if (!user || !user.role || user.role <= 0) {
                return res.status(403).json({ message: 'Invalid refresh token or insufficient permissions' });
            }

            const newAccessToken = jwt.sign({ _id: decoded._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' });

            const newRefreshToken = jwt.sign({ _id: decoded._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });

            res.cookie('refreshTokenAdmin', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });

            return res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            console.error('Admin refresh token error:', error);
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }

    // [POST] ~ LOGOUT ADMIN
    async logoutAdmin(req, res) {
        try {
            res.clearCookie('refreshTokenAdmin');
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Admin logout error:', error);
            return res.status(500).json({ message: 'Error Server:', error });
        }
    }

    // User Management Functions
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}, { password: 0, email_verification_token: 0, forgot_password_token: 0 });
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async updateUserByAdmin(req, res) {
        try {
            const { userId } = req.params;
            const updateData = req.body;

            delete updateData.password;
            delete updateData.email_verification_token;
            delete updateData.forgot_password_token;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.role === 2 && (!req.user || req.user.role !== 2)) {
                return res.status(403).json({ message: 'Not authorized to update admin users' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, select: '-password -email_verification_token -forgot_password_token' },
            );

            return res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser,
            });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.role === 2 && (!req.user || req.user.role !== 2)) {
                return res.status(403).json({ message: 'Not authorized to delete admin users' });
            }

            await User.findByIdAndDelete(userId);

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async addUserByAdmin(req, res) {
        try {
            const { email, password, username, full_name, phone_number, role, status } = req.body;

            if (!email || !password || !username) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                user_name: username,
                email,
                password: hashedPassword,
                full_name: full_name || '',
                type: 'WEBSITE',
                role: role || 0,
                phone_number: phone_number || '',
                is_verified: true,
                status: status || 1,
            });

            const savedUser = await newUser.save();
            const { password: _, ...userWithoutPassword } = savedUser._doc;

            return res.status(200).json({
                message: 'User added successfully!',
                user: userWithoutPassword,
            });
        } catch (error) {
            console.error('Error adding user:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new AuthController();

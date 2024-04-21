// Middleware để xác nhận email
module.exports=  async function emailMiddlware(req, res, next) {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // Xác nhận email và xóa mã token xác nhận
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Chuyển tiếp yêu cầu
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

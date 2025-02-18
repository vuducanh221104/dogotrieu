const axios = require('axios');

const verifyCaptcha = async (token) => {
    try {
        // Xác thực CAPTCHA với Cloudflare
        const verifyResponse = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        });
        if (!verifyResponse.data.success) {
            return { status: 400, valid: false, message: 'CAPTCHA validation failed' };
        }
        return { status: 201, valid: true, message: 'CAPTCHA validated successfully' };
    } catch (error) {
        return { status: 500, valid: false, message: 'CAPTCHA Internal server error' };
    }
};

module.exports = verifyCaptcha;

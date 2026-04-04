const axios = require('axios');

const verifyCaptcha = async (token, remoteip = '') => {
    try {
        const params = new URLSearchParams();
        params.append('secret', process.env.TURNSTILE_SECRET_KEY);
        params.append('response', token);
        if (remoteip) {
            params.append('remoteip', remoteip);
        }

        const verifyResponse = await axios.post(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            params.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        console.log('[Turnstile] Verify response:', JSON.stringify(verifyResponse.data));

        if (!verifyResponse.data.success) {
            const errorCodes = verifyResponse.data['error-codes'] || [];
            console.log('[Turnstile] Validation failed, error codes:', errorCodes);
            return { status: 400, valid: false, message: `CAPTCHA validation failed: ${errorCodes.join(', ')}` };
        }
        return { status: 201, valid: true, message: 'CAPTCHA validated successfully' };
    } catch (error) {
        console.error('[Turnstile] Verify error:', error.message);
        return { status: 500, valid: false, message: 'CAPTCHA Internal server error' };
    }
};

module.exports = verifyCaptcha;

const nodemailer = require('nodemailer');

// Tạo transporter (SMTP)
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const apiToRedirectEmail = `${process.env.BASE_URL_CLIENT_DOMAIN}/auth/verifyEmail/check?token=`; //cái này là Email đăng ký và xác nhận lại Email khi đã tạo tlk
const apiToRedirectRegisterEmail = `${process.env.BASE_URL_CLIENT_DOMAIN}/auth/verifyEmail/checkRegister?token=`;
const apiToRedirectFotgotPassword = `${process.env.BASE_URL_CLIENT_DOMAIN}/auth/resetPassword?token=`;
const apiToRedirectNewEmail = `${process.env.BASE_URL_CLIENT_DOMAIN}/auth/verifyEmail/check?token=`; //thay đổi thành new Email nhé

async function sendResendEmail(emailUser, verifyToken) {
    const mailOptions = {
        from: `Đồ Gỗ Triệu <${process.env.EMAIL_USER}>`,
        to: emailUser,
        subject: 'Xác nhận lại địa chỉ Email trên dogotrieu.com',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t37,.t42{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t38{padding-top:43px!important}.t40{border:0!important;border-radius:0!important}.t9{width:371px!important}.t26{width:231px!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t45" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class="t44" style="background-color:#F9F9F9;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t43" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#F9F9F9"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t37" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t41" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="451" class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <!--<![endif]-->
        <table class="t39" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t38" style="padding:50px 40px 40px 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="80" class="t3" style="width:80px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t3" style="width:80px;">
        <!--<![endif]-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t1"><a href="#" style="font-size:0px;" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="80" height="80" alt="" src="cid:unique-logo-id"/></a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="369" class="t9" style="width:369px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t9" style="width:369px;">
        <!--<![endif]-->
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t7"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Vui lòng xác minh lại Email của bạn</h1></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="308" class="t20" style="width:308px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t20" style="width:308px;">
        <!--<![endif]-->
        <table class="t19" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t18"><p class="t16" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn đã tạo tài khoản trên<span class="t11" style="margin:0;Margin:0;mso-line-height-rule:exactly;"> </span><a class="t14" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t13" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t12" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a><span class="t15" style="margin:0;Margin:0;mso-line-height-rule:exactly;">,</span> hãy nhấp vào nút xác minh. Điều này giúp bảo vệ tài khoản của bạn.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t27" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="220" class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <!--<![endif]-->
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t24" style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:8px;"><a class="t22" href=${apiToRedirectEmail}${verifyToken} style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target="_blank">Xác minh tài khoản của tôi</a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t32" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t36" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="318" class="t35" style="width:318px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t35" style="width:318px;">
        <!--<![endif]-->
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t33"><p class="t31" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn đang nhận email này vì bạn có tài khoản tại trên <a class="t30" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t29" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t28" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a>. Nếu bạn không chắc tại sao mình nhận được email này, vui lòng liên hệ với chúng tôi bằng cách trả lời email này.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>`,
        attachments: [
            {
                path: 'data:image/jpeg;base64,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',
                cid: 'unique-logo-id',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}
async function sendRegistrationEmail(emailUser, verifyToken) {
    const mailOptions = {
        from: `Đồ Gỗ Triệu <${process.env.EMAIL_USER}>`,
        to: emailUser,
        subject: 'Xác nhận địa chỉ Email trên dogotrieu.com',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t37,.t42{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t38{padding-top:43px!important}.t40{border:0!important;border-radius:0!important}.t9{width:371px!important}.t26{width:231px!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t45" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class="t44" style="background-color:#F9F9F9;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t43" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#F9F9F9"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t37" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t41" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="451" class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <!--<![endif]-->
        <table class="t39" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t38" style="padding:50px 40px 40px 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="80" class="t3" style="width:80px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t3" style="width:80px;">
        <!--<![endif]-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t1"><a href="#" style="font-size:0px;" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="80" height="80" alt="" src="cid:unique-logo-id"/></a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="369" class="t9" style="width:369px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t9" style="width:369px;">
        <!--<![endif]-->
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t7"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Vui lòng xác minh email của bạn</h1></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="308" class="t20" style="width:308px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t20" style="width:308px;">
        <!--<![endif]-->
        <table class="t19" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t18"><p class="t16" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn đã tạo tài khoản trên<span class="t11" style="margin:0;Margin:0;mso-line-height-rule:exactly;"> </span><a class="t14" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t13" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t12" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a><span class="t15" style="margin:0;Margin:0;mso-line-height-rule:exactly;">,</span> hãy nhấp vào nút xác minh. Điều này giúp bảo vệ tài khoản của bạn.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t27" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="220" class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <!--<![endif]-->
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t24" style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:8px;"><a class="t22" href=${apiToRedirectRegisterEmail}${verifyToken} style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target="_blank">Xác minh tài khoản của tôi</a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t32" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t36" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="318" class="t35" style="width:318px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t35" style="width:318px;">
        <!--<![endif]-->
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t33"><p class="t31" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn đang nhận email này vì bạn có tài khoản tại trên <a class="t30" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t29" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t28" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a>. Nếu bạn không chắc tại sao mình nhận được email này, vui lòng liên hệ với chúng tôi bằng cách trả lời email này.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>`,
        attachments: [
            {
                path: 'data:image/jpeg;base64,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',
                cid: 'unique-logo-id',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

async function sendForgotPasswordEmail(emailUser, verifyToken) {
    const mailOptions = {
        from: `Đồ Gỗ Triệu <${process.env.EMAIL_USER}>`,
        to: emailUser,
        subject: 'Xác nhận thay đổi mật khẩu trên dogotrieu.com',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t5,.t6{font-size:25px!important}.t67{padding:0 0 22px!important}.t22,.t58,.t69,.t85{width:480px!important}.t16,.t52,.t63,.t79{text-align:center!important}.t15,.t51,.t62,.t78{vertical-align:top!important;width:600px!important}.t13{border-top-left-radius:0!important;border-top-right-radius:0!important;padding-left:30px!important;padding-top:20px!important;padding-right:30px!important}.t49{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important;padding:30px!important}.t87{mso-line-height-alt:20px!important;line-height:20px!important}.t74{width:380px!important}.t3{width:65px!important}.t33,.t47{width:420px!important}.t7{mso-line-height-alt:15px!important;line-height:15px!important;display:block!important}.t11{Margin-right:auto!important}.t10{width:201px!important}.t6{mso-text-raise:5px!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&amp;family=Albert+Sans:wght@500&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t90" style="min-width:100%;Margin:0px;padding:0px;background-color:#E0E0E0;"><div class="t89" style="background-color:#E0E0E0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t88" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#E0E0E0;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#E0E0E0"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td align="center">
        <table class="t70" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="566" class="t69" style="width:566px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t69" style="width:566px;">
        <!--<![endif]-->
        <table class="t68" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t67" style="padding:50px 10px 31px 10px;"><div class="t66" style="width:100%;text-align:center;"><div class="t65" style="display:inline-block;"><table class="t64" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
        <tr class="t63"><td></td><td class="t62" width="546" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t61" style="width:100%;"><tr>
        <td class="t60" style="background-color:transparent;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t23" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="546" class="t22" style="width:546px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t22" style="width:546px;">
        <!--<![endif]-->
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t20"><div class="t19" style="width:100%;text-align:center;"><div class="t18" style="display:inline-block;"><table class="t17" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
        <tr class="t16"><td></td><td class="t15" width="546" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t14" style="width:100%;"><tr>
        <td class="t13" style="overflow:hidden;background-color:#586CE0;padding:27px 50px 0 50px;border-radius:18px 18px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="85" class="t3" style="width:85px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t3" style="width:85px;">
        <!--<![endif]-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t1"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="85" height="85" alt=""  src="cid:unique-logo-id"/></div></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr>
        <!--[if !mso]>-->
        <tr><td><div class="t7" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div></td></tr>
        <!--<![endif]-->
        <tr><td align="right">
        <table class="t11" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;">
        <tr>
        <!--[if mso]>
        <td width="271" class="t10" style="width:271px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t10" style="width:271px;">
        <!--<![endif]-->
        <table class="t9" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t8"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:30px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#FFFFFF;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;"><a class="t5" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#FFFFFF;mso-line-height-rule:exactly;" target="_blank">DOGOTRIEU.COM</a></h1></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:25px;line-height:25px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t59" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="546" class="t58" style="width:546px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t58" style="width:546px;">
        <!--<![endif]-->
        <table class="t57" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t56"><div class="t55" style="width:100%;text-align:center;"><div class="t54" style="display:inline-block;"><table class="t53" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
        <tr class="t52"><td></td><td class="t51" width="546" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t50" style="width:100%;"><tr>
        <td class="t49" style="overflow:hidden;background-color:#F8F8F8;padding:40px 50px 40px 50px;border-radius:0 0 18px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="381" class="t27" style="width:381px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t27" style="width:381px;">
        <!--<![endif]-->
        <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t25"><h1 class="t24" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:30px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Quên mật khẩu ?</h1></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t29" style="mso-line-height-rule:exactly;mso-line-height-alt:25px;line-height:25px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="446" class="t33" style="width:446px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t33" style="width:446px;">
        <!--<![endif]-->
        <table class="t32" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t31"><p class="t30" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Để đặt lại mật khẩu, hãy nhấn nút bên dưới. Liên kết sẽ tự hủy sau năm ngày.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t35" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
        <table class="t41" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="234" class="t40" style="background-color:#586CE0;overflow:hidden;width:234px;border-radius:40px 40px 40px 40px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t40" style="background-color:#586CE0;overflow:hidden;width:234px;border-radius:40px 40px 40px 40px;">
        <!--<![endif]-->
        <table class="t39" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t38" style="text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;padding:0 30px 0 30px;"><a class="t37"  href=${apiToRedirectFotgotPassword}${verifyToken} style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:0.9px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target="_blank"><span class="t36" style="margin:0;Margin:0;mso-line-height-rule:exactly;">Đặt lại mật khẩ</span>u</a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td><div class="t44" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
        <table class="t48" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="446" class="t47" style="width:446px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t47" style="width:446px;">
        <!--<![endif]-->
        <table class="t46" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t45"><p class="t43" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Nếu bạn có bất kỳ câu hỏi nào hoặc cần thêm sự hỗ trợ, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi bằng cách trả lời email này hoặc truy cập trang hỗ trợ của chúng tôi.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td align="center">
        <table class="t86" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="600" class="t85" style="width:600px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t85" style="width:600px;">
        <!--<![endif]-->
        <table class="t84" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t83"><div class="t82" style="width:100%;text-align:center;"><div class="t81" style="display:inline-block;"><table class="t80" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
        <tr class="t79"><td></td><td class="t78" width="600" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t77" style="width:100%;"><tr>
        <td class="t76" style="padding:0 50px 0 50px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t75" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="420" class="t74" style="width:420px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t74" style="width:420px;">
        <!--<![endif]-->
        <table class="t73" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t72"><p class="t71" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">© 2024 DOGOTRIEU.COM All Rights Reserved<br/></p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t87" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>`,
        attachments: [
            {
                path: 'data:image/jpeg;base64,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',
                cid: 'unique-logo-id',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

async function sendNewEmail(emailUser, verifyToken) {
    const mailOptions = {
        from: `Đồ Gỗ Triệu <${process.env.EMAIL_USER}>`,
        to: emailUser,
        subject: 'Xác nhận Email mới mà bạn đã thay đổi trên dogotrieu.com',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t37,.t42{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t38{padding-top:43px!important}.t40{border:0!important;border-radius:0!important}.t9{width:371px!important}.t26{width:231px!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t45" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class="t44" style="background-color:#F9F9F9;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t43" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#F9F9F9"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t37" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t41" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="451" class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t40" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:451px;border-radius:20px 20px 20px 20px;">
        <!--<![endif]-->
        <table class="t39" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t38" style="padding:50px 40px 40px 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="80" class="t3" style="width:80px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t3" style="width:80px;">
        <!--<![endif]-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t1"><a href="#" style="font-size:0px;" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="80" height="80" alt=""  src="cid:unique-logo-id"/></a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="369" class="t9" style="width:369px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t9" style="width:369px;">
        <!--<![endif]-->
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t7"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Vui lòng xác minh email của bạn</h1></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t21" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="308" class="t20" style="width:308px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t20" style="width:308px;">
        <!--<![endif]-->
        <table class="t19" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t18"><p class="t16" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn đã thay đổi Email trên<span class="t11" style="margin:0;Margin:0;mso-line-height-rule:exactly;"> </span><a class="t14" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t13" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t12" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a><span class="t15" style="margin:0;Margin:0;mso-line-height-rule:exactly;">,</span> hãy nhấp vào nút xác minh. Điều này giúp bảo vệ tài khoản của bạn.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t27" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="220" class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t26" style="background-color:#0057FF;overflow:hidden;width:220px;border-radius:8px 8px 8px 8px;">
        <!--<![endif]-->
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t24" style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:8px;"><a class="t22" href=${apiToRedirectNewEmail}${verifyToken}  style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;" target="_blank">Xác minh tài khoản của tôi</a></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t32" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t36" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <tr>
        <!--[if mso]>
        <td width="318" class="t35" style="width:318px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t35" style="width:318px;">
        <!--<![endif]-->
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr>
        <td class="t33"><p class="t31" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Bạn nhận được Email này vì bạn đã thay đổi Email tài khoản trên <a class="t30" href="dogotrieu.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:blue;mso-line-height-rule:exactly;" target="_blank"><span class="t29" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t28" style="margin:0;Margin:0;font-weight:700;color:BLUE;mso-line-height-rule:exactly;">dogotrieu.com</span></span></a>. Nếu bạn không chắc tại sao mình nhận được email này, vui lòng liên hệ với chúng tôi bằng cách trả lời email này.</p></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td>
        </tr></table>
        </td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>`,
        attachments: [
            {
                path: 'data:image/jpeg;base64,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',
                cid: 'unique-logo-id',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendResendEmail, sendRegistrationEmail, sendForgotPasswordEmail, sendNewEmail };

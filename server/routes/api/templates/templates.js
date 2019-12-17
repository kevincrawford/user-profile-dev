const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secureConnection: true,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASS
  }
});

const resetPasswordEmail = (name, link) => {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>SPEDxchange: Forgot Password</title>
  <style>
    * {
      font-family: sans-serif !important;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }
    *[x-apple-data-detectors],
    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
      .email-container {
        min-width: 375px !important;
      }
    }
  </style>
</head>
<body width="100%" bgcolor="#ffffff" style="margin: 0, padding:16px; mso-line-height-rule: exactly;">
  <div style="width: 100%; background: #ffffff; text-align: left;">

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
      <h3>${name},</h3>
      <p>You requested to reset your password for SPEDxchange. Use this <a href="${link}">link</a> to reset your password</p>
      <p>This password reset is only valid for 30 minutes</p>
      <br />
      <p>Thanks,<br />SPEDxchange</p>
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <div style="margin-bottom: 16px;">
      <h3>${name},</h3>
      <p>You requested to reset your password for SPEDxchange. Use this <a href="${link}">link</a> to reset your password</p>
      <p>This password reset is only valid for 30 minutes</p>
      <br />
      <p>Thanks,<br />SPEDxchange</p>
  </div>
  </div>
</body>
</html>`;
};

const contactNotifyEmail = (name, email, message) => {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>ACTION REQUIRED: New Contact Us</title>
  <style>
    * {
      font-family: sans-serif !important;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }
    *[x-apple-data-detectors],
    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    td {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
    }
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
      .email-container {
        min-width: 375px !important;
      }
    }
  </style>
</head>
<body width="100%" bgcolor="#ffffff" style="margin: 0, padding:16px; mso-line-height-rule: exactly;">
  <div style="width: 100%; background: #ffffff; text-align: left;">

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
      ${message}
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <div style="margin-bottom: 16px;">
      <h3>New Contact Us</h3>
      <table width="90%">
        <tr>
          <td>Name:</td>
          <td width="90%">${name}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            <a href="mailto:${email}?subject=RE: Thanks for contacting SPEDxchange">${email}</a>
          </td>
        </tr>
        <tr>
          <td>Message:</td>
          <td>${message}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;
};

const contactUserEmail = name => {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Thanks for contacting SPEDxchange</title>
  <style>
    * {
      font-family: sans-serif !important;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }
    *[x-apple-data-detectors],
    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
      .email-container {
        min-width: 375px !important;
      }
    }
  </style>
</head>
<body width="100%" bgcolor="#ffffff" style="margin: 0, padding:16px; mso-line-height-rule: exactly;">
  <div style="width: 100%; background: #ffffff; text-align: left;">

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
      <h3>${name},</h3>
      <p>Thanks for contacting us. We appreciate your comments.</p>
      <p>Our team will review your message and respond as needed.</p><br>
      <p>Best,<br>SPEDxchange</p>
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <div style="margin-bottom: 16px;">
      <h3>${name},</h3>
      <p>Thanks for contacting us. We appreciate your comments.</p>
      <p>Our team will review your message and respond as needed.</p><br>
      <p>Best,<br>SPEDxchange</p>
    </div>
  </div>
</body>
</html>`;
};

const welcomeEmail = name => {
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to SPEDxchange!</title>
    <style>
      * {
        font-family: sans-serif !important;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
      }
      *[x-apple-data-detectors],
      .x-gmail-data-detectors,
      .x-gmail-data-detectors *,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
        .email-container {
          min-width: 375px !important;
        }
      }
    </style>
  </head>
  <body width="100%" bgcolor="#ffffff" style="margin: 0, padding:16px; mso-line-height-rule: exactly;">
    <div style="width: 100%; background: #ffffff; text-align: left;">
  
      <!-- Visually Hidden Preheader Text : BEGIN -->
      <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
        <p><b>${name}</b></p>
        <p>Congratulations and welcome! You have successfully joined our special education community; we are glad you are here!  SPEDxchange is dedicated to helping you connect with others in the special education field to discover and grow in your specific areas of interest.  By signing up and joining our community, you now have access to up-to-date curated postings related to numerous topics in special education.  Whether you are a student preparing to enter the special education field, a seasoned professional, or a parent looking for support and answers, we are confident that you will find our information beneficial and informative.  Be sure to connect with SPEDxchange on social media to stay up-to-date on the happenings within our special education community.</p>
        <p>We look forward to connecting with you on our site.</p>
        <p>Sincerely,<br>The SPEDxchange Team</p>
      </div>
      <!-- Visually Hidden Preheader Text : END -->

      <div style="margin-bottom: 16px;">
      <p><b>${name}</b></p>
      <p>Congratulations and welcome!  You have successfully joined our special education community; we are glad you are here!  SPEDxchange is dedicated to helping you connect with others in the special education field to discover and grow in your specific areas of interest.  By signing up and joining our community, you now have access to up-to-date curated postings related to numerous topics in special education.  Whether you are a student preparing to enter the special education field, a seasoned professional, or a parent looking for support and answers, we are confident that you will find our information beneficial and informative.  Be sure to connect with SPEDxchange on social media to stay up-to-date on the happenings within our special education community.</p>
      <p>We look forward to connecting with you on our site.</p>
      <p>Sincerely,<br>The SPEDxchange Team</p>
    </div>
    </div>
  </body>
  </html>
  `;
};

const newUserNotifyEmail = (name, email) => {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>FYI: New User</title>
  <style>
    * {
      font-family: sans-serif !important;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }
    *[x-apple-data-detectors],
    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    td {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
    }
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
      .email-container {
        min-width: 375px !important;
      }
    }
  </style>
</head>
<body width="100%" bgcolor="#ffffff" style="margin: 0, padding:16px; mso-line-height-rule: exactly;">
  <div style="width: 100%; background: #ffffff; text-align: left;">

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
      New User
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <div style="margin-bottom: 16px;">
      <h3>New User</h3>
      <table width="90%">
        <tr>
          <td>Name:</td>
          <td width="90%">${name}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
          ${email}
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;
};

exports.transporter = transporter;
exports.contactUserEmail = contactUserEmail;
exports.contactNotifyEmail = contactNotifyEmail;
exports.resetPasswordEmail = resetPasswordEmail;
exports.welcomeEmail = welcomeEmail;
exports.newUserNotifyEmail = newUserNotifyEmail;

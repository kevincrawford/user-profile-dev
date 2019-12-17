const express = require('express');
const router = express.Router();
const spedEmail = require('./templates/templates');
const Contact = require('../../models/Contact');

// @route    POST api/auth
// @desc     Create a Contact Us Message
// @access   Public
router.post('/', async (req, res) => {
  try {
    const { user, name, email, message } = req.body;

    const contact = new Contact({
      user: user,
      name: name,
      email: email,
      message: message
    });

    await contact.save();

    const contactConfig = {
      from: `SPEDxchange <content@spedxchange.com>`,
      to: `${name} <${email}`,
      subject: 'Thanks for contacting SPEDxchange',
      html: spedEmail.contactUserEmail(name)
    };

    const notifyConfig = {
      from: `SPEDxchange <content@spedxchange.com>`,
      to: `SPEDxchange <content@spedxchange.com>`,
      subject: 'ACTION REQUIRED: New Contact Us',
      html: spedEmail.contactNotifyEmail(name, email, message)
    };

    await spedEmail.transporter.sendMail(contactConfig);
    await spedEmail.transporter.sendMail(notifyConfig);

    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

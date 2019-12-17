// const axios = require('axios');
const request = require('request');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const spedEmail = require('./templates/templates');

const User = require('../../models/User');

const makeProperties = props => {
  var properties = [
    {
      property: 'company',
      value: 'spedxchange-website'
    }
  ];
  const entries = Object.entries(props);
  for (const [key, val] of entries) {
    console.log('key: ', key);
    if (key.toString() !== 'email' && key.toString() !== 'displayName') {
      properties.push({
        property: key.toString().toLowerCase(),
        value: val
      });
    }
  }
  return { properties: properties };
};

// @route    POST api/crm/contact
// @desc     Create Hubspot Contact
// @access   Private
router.post('/contact', auth, async (req, res) => {
  const { email } = req.body;
  const properties = makeProperties(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const options = {
      method: 'POST',
      url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`,
      qs: { hapikey: process.env.HUBSPOT_API_KEY },
      headers: { 'Content-Type': 'application/json' },
      body: properties,
      json: true
    };

    request(options, async function(error, response, body) {
      if (error) res.status(500).send('Server Error');

      const contact = body;
      console.log(`contact: `, contact);

      user.vid = contact.vid;
      await user.save();

      const welcomeConfig = {
        from: `SPEDxchange <content@spedxchange.com>`,
        to: `${user.displayName} <${user.email}`,
        subject: 'Welcome to SPEDxchange!',
        html: spedEmail.welcomeEmail(user.displayName)
      };

      const notifyConfig = {
        from: `SPEDxchange <content@spedxchange.com>`,
        to: `SPEDxchange <content@spedxchange.com>`,
        subject: 'FYI: New User',
        html: spedEmail.newUserNotifyEmail(user.displayName, user.email)
      };

      await spedEmail.transporter.sendMail(welcomeConfig);
      await spedEmail.transporter.sendMail(notifyConfig);
    });

    // const contact = await request(options);
    // console.log('contact: ', contact);

    // user.vid = contact.vid;
    // await user.save();
  } catch (error) {
    // console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

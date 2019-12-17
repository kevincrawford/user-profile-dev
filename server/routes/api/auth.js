const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const RouteUtil = require('../routeUtil');
const SpedEmail = require('./templates/templates');
const User = require('../../models/User');
const ScholarshipApplication = require('../../models/ScholarshipApplication');

// @route    GET api/auth
// @desc     Get User Record
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'roles',
        select: 'type'
      });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate User & Get Token
// @access   Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    if (user.password === 'sped-migrating') {
      // Handle Password
      /*
       TODO: Check if password works on spedhunters
             For now assuming password is correct
       */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/request-reset
// @desc     Request Reset Password Email Link
// @access   Public
router.post('/request-reset', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(500).send('Server error');
    }

    const token = await bcrypt.genSalt(20);

    user.reset_password_token = token;
    user.reset_password_expires = Date.now() + 86400000;
    await user.save();

    const resetLink = 'localhost:3000/user/reset/' + token;

    const emailConfig = {
      from: 'SPEDxchange <content@spedxchange.com>',
      to: `${user.displayName} <${email}`,
      subject: 'SPEDxchange: Password Reset',
      html: SpedEmail.resetPasswordEmail(user.displayName, resetLink)
    };

    await SpedEmail.transporter.sendMail(emailConfig);

    res.json({ success: true });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/auth/reset
// @desc     Reset User Password
// @access   Public
router.post('/reset', async (req, res) => {
  try {
    // console.log('req.body: ', req.body);
    const { token, newPassword, verifyPassword } = req.body;
    const user = await User.findOne({
      reset_password_token: token,
      reset_password_expires: {
        $gt: Date.now()
      }
    });

    if (!user) {
      // console.log('user: not found.');
      return res.status(400).json({ errors: [{ msg: 'User not found.' }] });
    }

    if (newPassword === verifyPassword) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      await user.save();
      const data = {
        to: user.email,
        from: 'SPEDxchange <content@spedxchange.com>',
        template: 'reset-password-email',
        subject: 'SPEDxchange: Password Reset Confirmation',
        context: {
          name: RouteUtil.toTitleCase(user.displayName.split(' ')[0])
        }
      };
      await SpedEmail.transporter.sendMail(data);
      return res.json({ success: true });
    } else {
      return res.status(422).send({
        message: 'Passwords do not match.'
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/submit-scholarship
// @desc     Create/Update Scholarship Application
// @access   Private
router.post('/submit-scholarship', auth, async (req, res) => {
  try {
    const { school, graduation, essay, scholarshipName } = req.body;
    var application = await ScholarshipApplication.findOne({ user: req.user.id, scholarshipName: scholarshipName || 'clinical' });

    if (!application) {
      application = new ScholarshipApplication({
        user: req.user.id,
        scholarshipName: scholarshipName || 'clinical'
      });
    }

    application.school = school;
    application.graduation = graduation;
    application.essay = essay;
    application.updated = new Date();

    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth/scholarship-application
// @desc     Get Users Scholarship Application
// @access   Private
router.post('/scholarship-application', auth, async (req, res) => {
  try {
    const { scholarshipName } = req.body;
    var application = await ScholarshipApplication.findOne({ user: req.user.id, scholarshipName: scholarshipName || 'clinical' });
    if (!application) {
      application = {
        school: '',
        graduation: '',
        essay: ''
      };
    }
    res.json({ school: application.school, graduation: application.graduation, essay: application.essay });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

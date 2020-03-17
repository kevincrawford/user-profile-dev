const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../models/User');
const Role = require('../../models/Role');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, isEmployer } = req.body;
    // console.log('req.body: ', req.body);
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const names = displayName
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
    const firstName = names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : '';
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });

    let roles = ['reader'];
    if (isEmployer) {
      roles.push('client-user');
    }
    // console.log('roles: ', roles);

    user = new User({
      displayName: displayName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatar: avatar,
      password: password
    });

    // Handle Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Handle roles
    user.roles = [];
    for (role of roles) {
      const existingRole = await Role.findOne({ type: role });
      if (existingRole) {
        user.roles.push(existingRole._id);
      }
    }
    await user.save();

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
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/users
// @desc     Update User
// @access   Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { displayName, title, summary } = req.body;
    const user = await User.findById(req.user.id);

    const oldDisplayName = user.displayName;
    const oldFirstName = user.firstName;
    const oldLastName = user.lastName;

    const names = displayName
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
    const firstName = names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : '';

    let useNewDisplayName = true;
    if (!firstName || firstName.length < 1) {
      useNewDisplayName = false;
    }
    user.displayName = useNewDisplayName ? displayName : oldDisplayName;
    user.firstName = useNewDisplayName ? firstName : oldFirstName;
    user.lastName = useNewDisplayName ? lastName : oldLastName;
    user.title = title;
    user.summary = summary;
    // console.log('new user profile before save: ', user);
    await user.save();
    // console.log('new user profile: ', user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

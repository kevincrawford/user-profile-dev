const express = require('express');
const router = express.Router();
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
    const { displayName, email, password, roles } = req.body;
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
    if (roles && roles.length > 0) {
      let role;
      for (role of roles) {
        const existingRole = await Role.findOne({ type: role });
        if (existingRole) {
          user.roles.push(existingRole._id);
        }
      }
    } else {
      const newRole = await Role.findOne({ type: 'reader' });
      if (newRole) {
        user.roles.push(newRole._id);
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

module.exports = router;

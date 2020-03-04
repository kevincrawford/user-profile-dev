const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const auth = require('../../middleware/auth');
const util = require('../routeUtil');
const Organization = require('../../models/Organization');
const Location = require('../../models/Location');
const User = require('../../models/User');
const Role = require('../../models/Role');

// @route    GET api/organization
// @desc     Get all organizations
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/organization/:id
// @desc     Get Organization by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id)
      .populate({
        path: 'location'
      })
      .populate({
        path: 'locations'
      })
      .populate({
        path: 'users'
      })
      .populate({
        path: 'jobs'
      });

    if (!org) {
      return res.status(404).json({ msg: 'Organization not found' });
    }

    res.json(org);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Organization not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/organization/register
// @desc     Register User/Organization
// @access   Public
router.post('/register', async (req, res) => {
  try {
    const { displayName, email, password, name, street, city, state, zip, phone, website } = req.body;

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

    let roles = ['reader', 'client-user'];

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

    // handle org
    const domainParts = website.split('.');
    const domain = `${domainParts[domainParts.length - 2]}.${domainParts[domainParts.length - 1]}`;

    const latlng = await util.geoFindByAddress(`${street}, ${city} ${state}`);

    let locationData = {
      contact: user._id,
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      lat: latlng.lat,
      lng: latlng.lng
    };

    let orgLocation = new Location(locationData);
    await orgLocation.save();

    let organization = new Organization({
      name: name,
      summary: '',
      description: '',
      location: orgLocation._id,
      locations: [orgLocation._id],
      users: [user._id],
      website: website,
      domain: domain
    });

    await organization.save();

    user.organization = organization._id;
    orgLocation.organization = organization._id;

    await orgLocation.save();
    await user.save();

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/organization
// @desc     Create Organization
// @access   Private
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { name, street, city, state, zip, phone, website } = req.body;
    const domainParts = website.split('.');
    const domain = `${domainParts[domainParts.len - 2]}.${domainParts[domainParts.len - 1]}`;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const existingOrg = await Organization.findOne({ domain });

      if (existingOrg) {
        return res.status(400).json({ msg: 'Organization aleady exists' });
      }

      const latlng = await util.geoFindByAddress(`${street}, ${city} ${state}`);
      locationData.lat = latlng.lat;
      locationData.lng = latlng.lng;

      let locationData = {
        contact: req.user.id,
        name: name,
        street: street,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        lat: latlng.lat,
        lng: latlng.lng
      };

      let orgLocation = new Location(locationData);
      await orgLocation.save();

      let organization = new Organization({
        name: name,
        summary: '',
        description: '',
        location: orgLocation._id,
        locations: [orgLocation._id],
        users: [req.user.id],
        website: website,
        domain: domain
      });

      await organization.save();

      user.organization = organization._id;
      orgLocation.organization = organization._id;

      await orgLocation.save();
      await user.save();

      res.json(organization);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

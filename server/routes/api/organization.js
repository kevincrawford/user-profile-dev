const express = require('express');
const router = express.Router();
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

// @route    GET api/organization/geo/:address
// @desc     Get GEO Coordinates by Address
// @access   Private
router.get('/geo/:address', auth, async (req, res) => {
  try {
    const latlng = await util.geoFindByAddress(req.params.address);
    // console.log('geo: latlng: ', latlng);
    res.json(latlng.json.results[0].geometry.location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/organization/register
// @desc     Register User & Organization
// @access   Public
router.post('/register', async (req, res) => {
  try {
    const { displayName, email, password, name, street, city, state, zip, phone, website } = req.body;
    let bypassUser = false;
    // HANDLE USER

    let user = await User.findOne({ email });

    if (user) {
      if (user.organization && user.organization.length > 0) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      } else {
        bypassUser = true;
      }
    }

    if (!bypassUser) {
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
    }

    // Handle roles
    const roles = ['reader', 'client-user'];
    user.roles = [];
    for (role of roles) {
      const existingRole = await Role.findOne({ type: role });
      if (existingRole) {
        user.roles.push(existingRole._id);
      }
    }
    await user.save();

    // HANDLE ORGANIZATION
    const domainParts = website.split('.');
    const domain = `${domainParts[domainParts.length - 2]}.${domainParts[domainParts.length - 1]}`;

    const latlng = await util.geoFindByAddress(`${city} ${state}`);
    // console.log('lat: ', latlng.json.results[0].geometry.location.lat);
    // console.log('lng: ', latlng.json.results[0].geometry.location.lng);
    const point = {
      type: 'Point',
      coordinates: [latlng.json.results[0].geometry.location.lng, latlng.json.results[0].geometry.location.lat]
    };
    // console.log('coordinates: ', point.coordinates);

    let locationData = {
      contact: user._id,
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      loc: point
    };

    let orgLocation = new Location(locationData);
    await orgLocation.save();

    let organization = new Organization({
      name: name,
      summary: '',
      description: '',
      loc: point,
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

// @route    POST api/organization/location
// @desc     Add New Location to Organization
// @access   Private
router.post('/location', auth, async (req, res) => {
  const { contact, name, street, city, state, zip, phone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const org = await Organization.findById(user.organization);

    const latlng = await util.geoFindByAddress(`${street}, ${city} ${state}`);
    const point = {
      type: 'Point',
      coordinates: [latlng.json.results[0].geometry.location.lng, latlng.json.results[0].geometry.location.lat]
    };

    const newLocation = new Location({
      contact: contact || req.user.id,
      organization: org._id,
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      loc: point
    });

    await newLocation.save();
    org.locations.push(newLocation._id);
    await org.save();

    res.json(newLocation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/organization/location/:locationId
// @desc     Update Location to Organization
// @access   Private
router.put('/location/:locationId', auth, async (req, res) => {
  const { contact, name, street, city, state, zip, phone } = req.body;

  try {
    const location = await Location.findById(req.params.locationId);
    const latlng = await util.geoFindByAddress(`${street}, ${city} ${state}`);
    const point = {
      type: 'Point',
      coordinates: [latlng.json.results[0].geometry.location.lng, latlng.json.results[0].geometry.location.lat]
    };

    location.contact = contact;
    location.name = name;
    location.street = street;
    location.city = city;
    location.state = state;
    location.zip = zip;
    location.phone = phone;
    location.loc = point;

    await location.save();

    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/organization/location/:locationId
// @desc     Delete Location from Organization
// @access   Private
router.delete('/location/:locationId', auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    const org = await Organization.findById(location.organization);

    // Handle orphaned locations
    org.locations.pull(location._id);
    await org.save();

    await location.remove();

    res.json({ msg: 'Location Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/organization/user
// @desc     Add New User to Organization
// @access   Private
router.post('/user', auth, async (req, res) => {
  const { firstName, lastName, title, email, phone } = req.body;

  try {
    const admin = await User.findById(req.user.id);
    const org = await Organization.findById(admin.organization);

    let user = await User.findOne({ email });
    if (user) {
      if (user.organization && user.organization !== org._id) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
    const password = new Date().getTime().toString();

    const newUser = new User({
      organization: org._id,
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`,
      title: title,
      email: email,
      phone: phone,
      avatar: avatar,
      password: password
    });

    // Handle Password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    // Handle roles
    let roles = ['reader', 'client-user'];
    newUser.roles = [];
    for (role of roles) {
      const existingRole = await Role.findOne({ type: role });
      if (existingRole) {
        newUser.roles.push(existingRole._id);
      }
    }
    await newUser.save();

    org.users.push(newUser._id);
    await org.save();

    delete newUser.password;
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/user/:userId
// @desc     Update User to Organization
// @access   Private
router.put('/user/:userId', auth, async (req, res) => {
  const { firstName, lastName, title, phone } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    user.firstName = firstName;
    user.lastName = lastName;
    user.displayName = `${firstName} ${lastName}`;
    user.title = title;
    user.phone = phone;

    await user.save();

    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/user/:userId
// @desc     Delete User from Organization
// @access   Private
router.delete('/user/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const org = await Organization.findById(user.organization);

    // Handle orphaned locations
    org.users.pull(user._id);
    await org.save();

    await user.remove();

    res.json({ msg: 'User Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const util = require('../routeUtil');
const Organization = require('../../models/Organization');
const Location = require('../../models/Location');
const User = require('../../models/User');

// @route    GET api/users/geo
// @desc     Get Geo for Addresss
// @access   Public
router.get('/geo', async (req, res) => {
  try {
    // const geo = await geoLookup('1740 Ridge Ave, Suite 500, Evanston Il, 60201');
    const geo = await util.geoFindByAddress('17742 bbrgre, Evanston Il');
    // res.json(geo.json.results.geometry.location);
    // res.json(geo.json.results[0].geometry.location);
    res.json(geo.json);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/organization
// @desc     Get all Tags
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
    const org = await Organization.findById(req.params.id).populate({
      path: 'location',
      populate: {
        path: 'contact',
        select: ['displayName', 'email']
      }
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
    const { name, summary, description, website, location } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findById(req.user.id);
      const domain = user.email.split('@')[1];

      if (!domain) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const existingOrg = await Organization.findOne({ domain });

      if (existingOrg) {
        return res.status(400).json({ msg: 'Organization aleady exists' });
      }

      let locationData = {
        contact: req.user.id,
        name: location.name,
        contact: req.user.id,
        street: location.street,
        city: location.city,
        state: location.state,
        zip: location.zip,
        phone: location.phone,
        lat: location.lat,
        lng: location.lng
      };
      if (!location.lat) {
        const latlng = await util.geoFindByAddress(`${location.street}, ${location.city} ${location.state}`);
        locationData.lat = latlng.lat;
        locationData.lng = latlng.lng;
      }

      let orgLocation = new Location(locationData);
      await orgLocation.save();

      let organization = new Organization({
        name: name,
        summary: summary,
        description: description,
        location: orgLocation._id,
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

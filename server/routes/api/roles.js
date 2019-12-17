const express = require('express');
const router = express.Router();

const Role = require('../../models/Role');

// @route    GET api/roles
// @desc     Get all Roles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/roles/:role_id
// @desc     Get Tag by id
// @access   Public
router.get('/:role_id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.role_id);

    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    res.json(role);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/tags
// @desc     Create Tag
// @access   Public
router.post('/', async (req, res) => {
  try {
    const newRole = new Role({
      type: req.body.type,
      description: req.body.description
    });

    const role = await newRole.save();

    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

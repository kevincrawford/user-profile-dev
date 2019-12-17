const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Scholarship = require('../../models/Scholarship');

// @route    GET api/scholarships
// @desc     Get all Scholarships
// @access   Public
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/scholarships/:id
// @desc     Get Scholarship by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/scholarships
// @desc     Create Scholarship
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newScholarship = new Scholarship({
        slug: req.body.slug,
        title: req.body.title,
        summary: req.body.summary,
        description: req.body.description,
        isSped: req.body.isSped,
        active: req.body.active,
        url: req.body.url || '',
        open: req.body.open,
        closed: req.body.closed,
        announced: req.body.announced
      });

      const scholarship = await newScholarship.save();

      res.json(scholarship);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/scholarships/:id
// @desc     Delete Scholarship
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }

    // remove scholarship
    await scholarship.remove();

    res.json({ msg: 'Scholarship removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

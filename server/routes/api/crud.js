const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Tag = require('../../models/Tag');
const Question = require('../../models/Question');

// @route    GET api/tags
// @desc     Get all Tags
// @access   Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/tags/:id
// @desc     Get Tag by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ msg: 'Tag not found' });
    }

    res.json(tag);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/tags
// @desc     Create Tag
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('displayName', 'Name is required')
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
      const newTag = new Tag({
        name: req.body.name,
        description: req.body.description,
        questionCount: 0
      });

      const tag = await newTag.save();

      res.json(tag);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/tags/:id
// @desc     Delete Tag
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ msg: 'Tag not found' });
    }

    // remove tag from questions
    for (let questionId of tag.questions) {
      let question = await Question.findById(questionId);
      question.tags.pull({ _id: req.params.id });
      await question.save();
    }

    // remove tag
    await tag.remove();

    res.json({ msg: 'Tag removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

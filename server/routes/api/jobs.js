const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Job = require('../../models/Tag');
const Org = require('../../models/Organization');
const User = require('../../models/User');

// @route    GET api/jobs/:orgId
// @desc     Get all Jobs by Organization
// @access   Public
router.get('/all', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const org = await (await Org.findById(user.organization))
    .populate({
      path: 'answers',
      populate: {
        path: 'user',
        select: ['displayName', 'screenName', 'avatar']
      }
    });
    const jobs = await Job.find({ organization: user.organization });

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/jobs/:jobId
// @desc     Get Job by Id
// @access   Public
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/job
// @desc     Create Job
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('summary', 'Summary is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { jobId, jobType, title, summary, description, status, salaryPeriod, salaryAmount, start, publish } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newJob = new Job({
        jobId: jobId,
        jobType,
        title,
        summary,
        description,
        status,
        salaryPeriod,
        salaryAmount,
        start,
        publish
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

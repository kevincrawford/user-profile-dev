const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Job = require('../../models/Job');
const Org = require('../../models/Organization');
const User = require('../../models/User');

// @route    GET api/job/list
// @desc     Get all Jobs by Organization
// @access   Private
router.get('/list/:orgId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const org = req.params.orgId || user.organization;
    const jobs = await Job.find({ organization: org });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/job/:jobId
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
router.post('/', auth, async (req, res) => {
  const { jobId, jobType, title, summary, description, status, salaryPeriod, salaryAmount, applyLink } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const org = await Org.findById(user.organization);

    const newJob = new Job({
      organization: org._id,
      location: org.location,
      loc: org.loc,
      jobId: jobId,
      jobType: jobType,
      title: title,
      summary: summary,
      description: description,
      status: status,
      salaryPeriod: salaryPeriod,
      salaryAmount: salaryAmount,
      applyLink: applyLink
    });

    const job = await newJob.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/job/
// @desc     Update Job
// @access   Private
router.put('/', auth, async (req, res) => {
  const { _id, jobId, jobType, title, summary, description, status, salaryPeriod, salaryAmount, applyLink } = req.body;
  try {
    const job = await Job.findById(_id);
    const user = await User.findById(req.user.id);
    const org = await Org.findById(user.organization);

    job.jobId = jobId;
    job.jobType = jobType;
    job.title = title;
    job.summary = summary;
    job.description = description;
    job.status = status;
    job.salaryPeriod = salaryPeriod;
    job.salaryAmount = salaryAmount;
    job.applyLink = applyLink;
    job.loc = org.loc;

    await job.save();
    // const job = await Job.findOneAndUpdate({ _id: req.params.id }, update);
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/tags/:id
// @desc     Delete Tag
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Tag not found' });
    }

    job.status = 'Archived';
    await job.save();

    res.json({ msg: 'Job Archived' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

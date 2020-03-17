const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Job = require('../../models/Job');
const Org = require('../../models/Organization');
const User = require('../../models/User');

const milesToMeters = miles => {
  return parseFloat(miles * 1609.344);
};

const rad = x => {
  return (x * Math.PI) / 180;
};

const getDistance = (p1, p2) => {
  // console.log('p1, p2: ', p1, p2);
  var R = 6371000; // Earth’s mean radius in meter
  var dLat = rad(p2[0] - p1[0]);
  var dLong = rad(p2[1] - p1[1]);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 0.00062137;
  // console.log('d: ', d);
  return d; // returns the distance in meter
};

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

// @route    GET api/job/jobsByDistance
// @desc     Get Jobs distance
// @access   Public
router.get('/jobsByDistFn', async (req, res) => {
  try {
    console.log('getDistance: ', getDistance([42.0450722, -87.68769689999999], [41.881832, -87.623177]));
    const query = {
      $where: () => {
        return getDistance(this.loc.coordinates, [41.881832, -87.623177]) === 1;
      }
    };

    const jobs = await Job.find({
      $where: () => {
        return getDistance(this.loc.coordinates, [41.881832, -87.623177]) <= 1;
      }
    });
    if (!jobs) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    let activeJobs = [];
    jobs.forEach(job => {
      if (job.status === 'Published') activeJobs.push(job);
    });

    res.json(activeJobs);
  } catch (error) {
    console.error(error.message);
    // if (err.kind === 'ObjectId') {
    //   return res.status(404).json({ msg: 'Job not found' });
    // }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/job/jobsByRadiusDistance
// @desc     Get All Jobs By Radius Distance
// @access   Public
router.get('/jobsByRadiusDistance/:lat/:lng/:dis', async (req, res) => {
  try {
    if (!req.params.lat || !req.params.lng || !req.params.dis) {
      return res.status(404).json({ msg: 'Missing Parameters' });
    }
    const lat = parseFloat(req.params.lat);
    const lng = parseFloat(req.params.lng);
    const dis = parseFloat(req.params.dis);
    // console.log('lat: ', lat);
    // console.log('lng: ', lng);
    // console.log('dis: ', dis);
    // console.log('getDistance: ', getDistance([lat, lng], [42.0450722, -87.68769689999999]));
    const query = {
      loc: {
        $geoWithin: {
          $centerSphere: [[lat, lng], dis / 3963.190592]
        }
      }
    };

    const jobs = await Job.find(query);
    if (!jobs) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    let activeJobs = [];
    jobs.forEach(job => {
      if (job.status === 'Published' && getDistance([lat, lng], job.loc.coordinates) <= dis) activeJobs.push(job);
    });

    res.json(activeJobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/job/jobsByDistance
// @desc     Get Jobs distance
// @access   Public
router.get('/jobsByDistance', async (req, res) => {
  try {
    const lng = parseFloat(41.881832);
    const lat = parseFloat(-87.623177);
    let maxDistance = parseFloat(5);
    // console.log('milesToMeters(maxDistance): ', milesToMeters(maxDistance));
    // console.log('meterConversion.mToKm(maxDistance): ', meterConversion.mToKm(maxDistance));
    // console.log('meterConversion.kmToM(maxDistance): ', meterConversion.kmToM(maxDistance));
    // console.log(
    //   'distance(41.881832, -87.623177, 42.0450722, -87.68769689999999): ',
    //   distance(41.881832, -87.623177, 42.0450722, -87.68769689999999)
    // );
    if ((!lng && lng !== 0) || (!lat && lat !== 0) || !maxDistance) {
      console.log('locationsListByDistance missing params');
      return res.status(404).json({ msg: 'lng, lat and maxDistance query parameters are all required' });
    }
    var point = {
      type: 'Point',
      coordinates: [lng, lat]
    };
    // Job.geoNear(point, geoOptions, function(err, results, stats) {
    //   var locations;
    //   console.log('Geo Results', results);
    //   console.log('Geo stats', stats);
    //   if (err) {
    //     console.log('geoNear error:', err);
    //     return res.status(404).json({ msg: err });
    //   } else {
    //     locations = buildLocationList(req, res, results, stats);
    //     return res.status(200).json(locations);
    //   }
    // });
    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: point,
          spherical: true,
          distanceMultiplier: 1 / 6356,
          maxDistance: milesToMeters(maxDistance),
          distanceField: 'dist.calculated',
          includeLocs: 'dist.location'
        }
      }
    ]);

    if (!jobs) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    let activeJobs = [];
    jobs.forEach(job => {
      if (job.status === 'Published') activeJobs.push(job);
    });

    res.json(activeJobs);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/job/:jobId
// @desc     Get Job by Id
// @access   Public
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    const org = await Org.findById(job.organization);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    if (!job.jobAdmin) job.jobAdmin = org.users[0];

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
  const {
    jobAdmin,
    jobId,
    jobType,
    title,
    summary,
    description,
    status,
    salaryPeriod,
    salaryAmount,
    applyLink,
    location
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const org = await Org.findById(user.organization);
    const loc = await Location.findById(location || org.location);

    const newJob = new Job({
      organization: org._id,
      location: loc,
      loc: loc.loc,
      jobAdmin: jobAdmin,
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
    if (!org.jobs || !Array.isArray(org.jobs)) {
      org.jobs = [job._id];
    } else {
      org.jobs.push(job._id);
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/job/:jobId
// @desc     Update Job
// @access   Private
router.put('/:jobId', auth, async (req, res) => {
  const {
    jobAdmin,
    jobId,
    jobType,
    title,
    summary,
    description,
    status,
    salaryPeriod,
    salaryAmount,
    applyLink,
    location
  } = req.body;

  try {
    const job = await Job.findById(req.params.jobId);
    const loc = await Location.findById(location);

    job.jobAdmin = jobAdmin;
    job.jobId = jobId;
    job.jobType = jobType;
    job.title = title;
    job.summary = summary;
    job.description = description;
    job.status = status;
    job.salaryPeriod = salaryPeriod;
    job.salaryAmount = salaryAmount;
    job.applyLink = applyLink;
    job.location = location;
    job.loc = loc.loc;
    job.updated = new Date();

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/job/:jobId
// @desc     Delete Tag
// @access   Private
router.delete('/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
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

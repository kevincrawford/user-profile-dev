const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const ScholarshipApplication = require('../../models/ScholarshipApplication');

// @route    GET api/reports/users
// @desc     Get all Users
// @access   Private
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const applicants = await ScholarshipApplication.find().populate('user', [
      'displayName',
      'firstName',
      'lastName',
      'email'
    ]);

    const result = {
      users: users,
      applicants: applicants
    };

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/reports/convertUserId
// @desc     Get all Users
// @access   Private
router.get('/convertUserId', async (req, res) => {
  // const ObjectId = mongoose.Types.ObjectId;
  try {
    let requests = [];
    let cursor = await ScholarshipApplication.find({}, { user: 1 }).snapshot();
    cursor.forEach(async document => {
      try {
        requests.push({
          updateOne: {
            filter: { _id: document._id },
            update: { $set: { user: mongoose.Types.ObjectId(document.user) } }
          }
        });
        if (requests.length === 1000) {
          // Execute per 1000 operations and re-init
          await ScholarshipApplication.bulkWrite(requests);
          requests = [];
        }
      } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });
    // Clean up queues
    if (requests.length > 0) await ScholarshipApplication.bulkWrite(requests);
    res.json({ response: 'done' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

/*
      const appl = ScholarshipApplication.findById(doc.user);
      if (counter < 3) console.log('appl: ', appl);
      const id = mongoose.Types.ObjectId(doc.user);
      appl.user = id;
      await
*/

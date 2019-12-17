const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const auth = require('../../middleware/auth');
const Document = require('../../models/Document');

// S3
const multer = require('multer');
const multerS3 = require('multer-s3');

const AWSAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const AWSSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
const AWSBucketName = process.env.AWS_BUCKET_NAME;
const AWSRegion = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: AWSRegion
});

const s3 = new AWS.S3({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: AWSRegion
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: function(req, file, cb) {
      const bucket = req.params.bucket ? req.params.bucket : AWSBucketName;
      const folder = req.params.folder ? '/' + req.params.folder : '';
      cb(null, bucket + folder);
    },
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('file', 3);

const uploadNews = multer({
  storage: multerS3({
    s3: s3,
    bucket: function(req, file, cb) {
      const bucket = req.params.bucket ? req.params.bucket : AWSBucketName;
      const folder = req.params.folder ? '/' + req.params.folder : '';
      cb(null, 'spedxchange/' + bucket + folder);
    },
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('file', 3);

// @route    GET api/upload
// @desc     Get all Documents & Routes
// @access   Public
router.get('/', async (req, res) => {
  try {
    const files = await Document.find().sort({ createdAt: 1 });
    res.json(files);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/upload/:id
// @desc     Get Documents by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const file = await Document.findById(req.params.id);
    res.json(file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/upload/file
// @desc     Upload File
// @access   Private
router.post('/file', upload, async (req, res) => {
  res.send('File Uploaded');
});

// @route    POST api/upload/:bucket/:folder
// @desc     Upload File
// @access   Private
router.post('/:bucket/:folder', upload, async (req, res) => {
  res.send('Files Uploaded');
});

// @route    POST api/upload/news/:bucket/:folder
// @desc     Upload File
// @access   Private
router.post('/news/:bucket/:folder', uploadNews, async (req, res) => {
  res.send('Files Uploaded');
});

// @route    PUT api/upload/edit/:id
// @desc     Edit File Description
// @access   Private
router.put('/edit/:id', auth, async (req, res) => {
  try {
    const file = await Document.findByIdAndUpdate(req.params.id);
    file.description = req.body.description;
    await file.save();
    res.json(file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/upload/:id
// @desc     Delete File
// @access   Private
router.delete(':id', auth, async (req, res) => {
  try {
    // Get the file record
    const file = await Document.findById(req.params.id);

    const s3bucket = new AWS.S3({
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretKey,
      region: AWSRegion
    });

    const params = {
      Bucket: AWSBucketName,
      Key: file.s3_key
    };

    // Remove file from AWS-S3
    await s3bucket.deleteObject(params);

    // Remove file reference from MongoDB
    await file.remove();

    res.json({ msg: 'File removed.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

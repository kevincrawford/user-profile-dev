const express = require('express');
const router = express.Router();

const Tag = require('../../models/Tag');

// @route    GET api/search/:term
// @desc     Get Search Results by Term
// @access   Public
router.get('/:term', async (req, res) => {
  try {
    // const results = await Question.find({$text: {$search: req.params.id}});

    const results = {
      questions: [],
      articles: [],
      tags: []
    };

    res.json(results);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/search/tags/:term
// @desc     Get Search Tags by Term
// @access   Public
router.get('/tags/:term', async (req, res) => {
  const { term } = req.params;
  // console.log('term: ', term);
  try {
    const tags = await Tag.aggregate([
      {
        $searchBeta: {
          search: {
            path: ['text'],
            query: term
          }
        }
      },
      {
        $project: {
          text: 1
        }
      }
    ]).limit(10);

    res.json(tags);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tag not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

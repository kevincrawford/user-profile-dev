const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Category = require('../../models/Category');
const ArticleCategory = require('../../models/ArticleCategory');
// const Question = require('../../models/Question');
// const Article = require('../../models/Article');

// @route    GET api/category/:type
// @desc     Get all Categories by type
// @access   Public
router.get('/:type', async (req, res) => {
  try {
    let categories;
    switch (req.params.type) {
      case 'question':
        categories = await Category.find();
        break;
      case 'article':
        categories = await ArticleCategory.find();
        break;
      default:
        return res.status(404).json({ msg: 'Category type error' });
    }

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/category/:type
// @desc     Create Category by type
// @access   Private
router.post('/:type', async (req, res) => {
  try {
    let newCategory;
    switch (req.params.type) {
      case 'question':
        newCategory = new Category({
          text: req.body.text,
          description: req.body.description,
          questionCount: 0,
          questions: []
        });
        break;
      case 'article':
        newCategory = new ArticleCategory({
          text: req.body.text,
          description: req.body.description
        });
        break;
      default:
        return res.status(404).json({ msg: 'Category type error' });
    }
    const category = await newCategory.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

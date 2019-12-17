const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Tag = require('../../models/Tag');
const ArticleTag = require('../../models/ArticleTag');
const Question = require('../../models/Question');
const Article = require('../../models/Article');

// @route    GET api/tags/:type/suggestions
// @desc     Get all Tags for suggestions
// @access   Public
router.get('/:type/suggestions', async (req, res) => {
  try {
    let tags;
    switch (req.params.type) {
      case 'question':
        tags = await Tag.find({}, { text: 1 }).sort({ text: 1 });
        break;
      case 'article':
        tags = await ArticleTag.find({}, { text: 1 }).sort({ text: 1 });
        break;
      default:
        return res.status(404).json([]);
    }
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/tags/:type
// @desc     Get all Tags by Type
// @access   Public
router.get('/:type', async (req, res) => {
  try {
    let tags;
    switch (req.params.type) {
      case 'question':
        tags = await Tag.find().sort({ questionCount: -1 });
        break;
      case 'article':
        tags = await ArticleTag.find().sort({ questionCount: -1 });
        break;
      default:
        return res.status(404).json({ msg: 'Tag type error' });
    }
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/tags/:type/:id
// @desc     Get Tag by type & id
// @access   Public
router.get('/:type/:id', async (req, res) => {
  try {
    let tag;
    switch (req.params.type) {
      case 'question':
        tag = await Tag.findById(req.params.id);
        break;
      case 'article':
        tag = await ArticleTag.findById(req.params.id);
        break;
      default:
        return res.status(404).json({ msg: 'Tag type error' });
    }

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

// @route    GET api/tags/:type/:id
// @desc     Get Tag by type & id
// @access   Public
router.get('/name/:type/:text', async (req, res) => {
  const { type, text } = req.params;
  try {
    let tag;
    switch (type) {
      case 'question':
        tag = await Tag.findOne({ text: text }, { text: 1 });
        break;
      case 'article':
        tag = await ArticleTag.findOne({ text: text }, { text: 1 });
        break;
      default:
        return res.status(404).json({ msg: 'Tag type error' });
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

// @route    POST api/tags/:type
// @desc     Create Tag by type
// @access   Private
router.post('/:type', auth, async (req, res) => {
  try {
    let newTag;
    // console.log('start switch');
    switch (req.params.type) {
      case 'question':
        newTag = new Tag({
          text: req.body.text,
          description: req.body.description
        });
        // console.log('inside switch');
        break;
      case 'article':
        newTag = new ArticleTag({
          text: req.body.text,
          description: req.body.description
        });
        break;
      default:
        return res.status(404).json({ msg: 'Tag type error' });
    }
    // console.log('end switch');
    // console.log('newTag: ', newTag);

    const tag = await newTag.save();

    res.json(tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

// @route    DELETE api/tags/:type/:id
// @desc     Delete Tag
// @access   Private
router.delete('/:type/:id', auth, async (req, res) => {
  try {
    let tag;
    switch (req.params.type) {
      case 'question':
        tag = await Tag.findById(req.params.id);

        if (!tag) {
          return res.status(404).json({ msg: 'Tag not found' });
        }

        // remove tag from questions
        for (let questionId of tag.questions) {
          let question = await Question.findById(questionId);
          question.tags.pull({ _id: req.params.id });
          await question.save();
        }
        break;
      case 'article':
        tag = await ArticleTag.findById(req.params.id);

        if (!tag) {
          return res.status(404).json({ msg: 'Tag not found' });
        }

        // remove tag from article
        for (let articleId of tag.articles) {
          let article = await Article.findById(articleId);
          article.tags.pull({ _id: req.params.id });
          await article.save();
        }
        break;
      default:
        return res.status(404).json({ msg: 'Tag type error' });
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

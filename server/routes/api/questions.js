const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const HTMLParser = require('node-html-parser');

const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
const User = require('../../models/User');
const Tag = require('../../models/Tag');
const Category = require('../../models/Category');

// @route    GET api/questions
// @desc     Get all Questions and Question Document Count
// @access   Public
router.get('/', async (req, res) => {
  try {
    const questionCount = await Question.countDocuments();
    const questions = await Question.find()
      .sort({ updated: -1 })
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      });
    res.json({
      questionCount: questionCount,
      questions: questions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/page/:page
// @desc     Get all Questions
// @access   Public
router.get('/page/:page', async (req, res) => {
  try {
    const resPerPage = 10;
    const page = req.params.page || 1;

    const questionCount = await Question.countDocuments();
    const questions = await Question.find()
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage)
      .sort({ updated: -1 })
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      });
    res.json({
      activePage: page,
      totalPages: Math.ceil(questionCount / resPerPage),
      questionCount: questionCount,
      questions: questions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/:uid/:slug
// @desc     Get Question by Id
// @access   Public
router.get('/:uid/:slug', async (req, res) => {
  try {
    const question = await Question.findOne({
      uid: req.params.uid,
      slug: req.params.slug
    })
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/:uid/:slug
// @desc     Get Question by Id
// @access   Public
router.get('/view/:uid/:slug', async (req, res) => {
  try {
    const question = await Question.findOne({
      uid: req.params.uid,
      slug: req.params.slug
    })
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    question.viewCount++;
    await question.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/:question_id
// @desc     Get Question by Id
// @access   Public
router.get('/:question_id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers'
      });

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/questions
// @desc     Create Question
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const { uid, slug, title, content, tags, category } = req.body;

    const rawTextParse = HTMLParser.parse(content);

    const newQuestion = new Question({
      user: req.user.id,
      title: title,
      content: content,
      rawText: rawTextParse.structuredText,
      category: category,
      uid: uid,
      slug: slug
    });

    // Save question
    const question = await newQuestion.save();

    // Handle tags
    question.tags = [];
    if (tags && tags.length > 0) {
      let tag;
      for (tag of tags) {
        text = tag.toLowerCase().trim();
        let existingTag = await Tag.findOne({ text: text });
        if (!existingTag) {
          const newTag = new Tag({
            text: text,
            questionCount: 1,
            questions: question._id
          });
          const createdTag = await newTag.save();
          question.tags.push(createdTag._id);
        } else {
          existingTag.questions.push(question._id);
          existingTag.questionCount++;
          question.tags.push(existingTag._id);
          await existingTag.save();
        }
      }
    }

    // Handle Category
    const exitingCategory = await Category.findById(category);
    if (exitingCategory.questionCount) {
      exitingCategory.questionCount++;
    } else {
      exitingCategory.questionCount = 1;
    }
    exitingCategory.questions.push(question._id);
    await exitingCategory.save();

    await question.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/questions/admin/:user_id
// @desc     Create Question for A User
// @access   Private
router.post('/admin/:user_id', auth, async (req, res) => {
  try {
    const { uid, slug, title, content, tags, category } = req.body;

    const rawTextParse = HTMLParser.parse(content);

    const newQuestion = new Question({
      user: req.user.id,
      title: title,
      content: content,
      rawText: rawTextParse.structuredText,
      category: category,
      uid: uid,
      slug: slug
    });

    // Save question
    const question = await newQuestion.save();

    // Handle tags
    question.tags = [];
    if (tags && tags.length > 0) {
      let tag;
      for (tag of tags) {
        text = tag.toLowerCase().trim();
        let existingTag = await Tag.findOne({ text: text });
        if (!existingTag) {
          const newTag = new Tag({
            text: text,
            questionCount: 1,
            questions: question._id
          });
          const createdTag = await newTag.save();
          question.tags.push(createdTag._id);
        } else {
          existingTag.questions.push(question._id);
          existingTag.questionCount++;
          question.tags.push(existingTag._id);
          await existingTag.save();
        }
      }
    }

    await question.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/:question_id
// @desc     Update Question
// @access   Private
router.put('/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    const oldCategory = question.category;

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    const { category, title, content, tags, oldTags } = req.body;
    const rawTextParse = HTMLParser.parse(content);

    question.category = category;
    question.title = title;
    question.content = content;
    (question.rawText = rawTextParse.structuredText), (question.tags = []);

    let tag;
    let currentTag;

    // Handle Old Tags
    if (oldTags && oldTags.length > 0) {
      for (currentTag of oldTags) {
        const tag = await Tag.findById(tag._id);
        if (tag) {
          tag.questions.pull({ _id: question._id });
          tag.questionCount--;
          await tag.save();
        }
      }
    }

    // Handle New Tags
    if (newTags && newTags.length > 0) {
      for (tag of tags) {
        const text = tag.toLowerCase().trim();
        let existingTag = await Tag.findOne({ text: text });
        if (!existingTag) {
          const newTag = new Tag({
            text: text,
            questionCount: 1,
            questions: question._id
          });
          const createdTag = await newTag.save();
          question.tags.push(createdTag._id);
        } else {
          existingTag.questions.push(question._id);
          existingTag.questionCount++;
          question.tags.push(existingTag._id);
          await existingTag.save();
        }
      }
    }

    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/question/:question_id
// @desc     Delete Question
// @access   Private
router.delete('/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Check user
    if (question.user.toString() !== req.user.id) {
      const currentUser = await User.findById(req.user.id);
      if (currentUser.role !== 'admin') {
        return res.status(401).json({ msg: 'Authorization denied.' });
      }
    }

    // Handle orphaned category
    const category = await Category.findById(question.category);
    category.questionCount--;
    category.questions.pull(question._id);
    await category.save();

    // Handle orphaned tags
    const tags = question.tags;
    if (tags && tags.length > 0) {
      let tag;
      for (tag of tags) {
        let currentTag = await Tag.findById(tag._id);
        currentTag.questionCount--;
        if (currentTag.questionCount === 0) {
          await currentTag.remove();
        } else {
          currentTag.questions.pull({ _id: question._id });
          await currentTag.save();
        }
      }
    }

    // remove question
    await question.remove();

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/like/:question_id
// @desc     Like Question
// @access   Private
router.put('/like/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    if (question.likes.indexOf(req.user.id) < 0) {
      // check if user unliked the question
      if (question.unlikes.indexOf(req.user.id) > -1) {
        question.unlikes.pull(req.user.id);
      } else {
        question.likes.unshift(req.user.id);
      }
      // recount likes and save question
      question.likeCount = question.likes.length + question.unlikes.length;
      question.rating = question.likes.length - question.unlikes.length;
      await question.save();
    }

    const updatedQuestion = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    res.json(updatedQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/unlike/:question_id
// @desc     Unlike Question
// @access   Private
router.put('/unlike/:question_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    if (question.unlikes.indexOf(req.user.id) < 0) {
      // check if user unliked the question
      if (question.likes.indexOf(req.user.id) > -1) {
        question.likes.pull(req.user.id);
      } else {
        question.unlikes.unshift(req.user.id);
      }
      // recount likes and save question
      question.likeCount = question.likes.length + question.unlikes.length;
      question.rating = question.likes.length - question.unlikes.length;
      await question.save();
    }

    const updatedQuestion = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    res.json(updatedQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/questions/answer/:question_id
// @desc     Answer A Question
// @access   Private
router.post('/answer/:question_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    const newAnswer = new Answer({
      user: req.user.id,
      question: question._id,
      displayName: user.displayName,
      avatar: user.avatar,
      content: req.body.content
    });

    await newAnswer.save();

    question.answers.push(newAnswer._id);
    await question.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/answer/:question_id/:answer_id
// @desc     Update Answer
// @access   Private
router.put('/answer/:question_id/:answer_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);
    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check user
    if (answer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    answer.set({ content: req.body.content });

    await question.save();
    res.json(question.answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/answer/like/:question_id/:answer_id
// @desc     Like Answer
// @access   Private
router.put('/answer/like/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = await Answer.findById(req.params.answer_id);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    if (answer.likes.indexOf(req.user.id) < 0) {
      // check if user unliked the answer
      if (answer.unlikes.indexOf(req.user.id) > -1) {
        answer.unlikes.pull(req.user.id);
      } else {
        answer.likes.unshift(req.user.id);
      }
      // recount likes and save answer
      answer.likeCount = answer.likes.length + answer.unlikes.length;
      answer.rating = answer.likes.length - answer.unlikes.length;
      await answer.save();
    }

    const updatedQuestion = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    res.json(updatedQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/answer/unlike/:question_id/:answer_id
// @desc     Unlike Answer
// @access   Private
router.put('/answer/unlike/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = await Answer.findById(req.params.answer_id);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    if (answer.unlikes.indexOf(req.user.id) < 0) {
      // check if user unliked the answer
      if (answer.likes.indexOf(req.user.id) > -1) {
        answer.likes.pull(req.user.id);
      } else {
        answer.unlikes.unshift(req.user.id);
      }
      // recount likes and save answer
      answer.likeCount = answer.likes.length + answer.unlikes.length;
      answer.rating = answer.likes.length - answer.unlikes.length;
      await answer.save();
    }

    const updatedQuestion = await Question.findById(req.params.question_id)
      .populate({
        path: 'user',
        select: ['displayName', 'screenName', 'avatar', 'roles']
      })
      .populate({
        path: 'categories',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      })
      .populate({
        path: 'roles',
        select: 'type'
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'user',
          select: ['displayName', 'screenName', 'avatar']
        }
      });

    res.json(updatedQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/questions/answer/:question_id/:answer_id
// @desc     Delete Answer
// @access   Private
router.delete('/answer/:question_id/:answer_id', auth, async (req, res) => {
  try {
    // Get Question
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Get Answer
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);
    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    // Check user
    if (answer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    question.answers.pull({ _id: req.params.answer_id });
    await question.save();
    res.json(question.answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/questions/answer/:answer_id
// @desc     Get Answer by Id
// @access   Public
router.get('/answer/:answer_id', async (req, res) => {
  try {
    const question = await Question.findOne({ 'answers._id': req.params.answer_id });
    const answer = question.answers.find(answer => answer.id === req.params.answer_id);

    // console.log('answer: ', answer);

    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' });
    }

    res.json(answer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/questions/tags/:question_id/:tags
// @desc     Add Tag to Question
// @access   Private
router.put('/answer/tags/:question_id/:tag', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    const tag = req.params.tag.toLowerCase().trim();
    existingTag = await Tag.find({ text: tag });
    if (!existingTag) {
      // add new tag if it does nor exist
      const newTag = new Tag({
        text: tag,
        questionCount: 1,
        questions: question._id
      });
      const createdTag = await newTag.save();
      question.tags.push(createdTag._id);
      await question.save();
    } else {
      // update existing tag
      existingTag.questions.push(question._id);
      existingTag.questionCount++;
      question.tags.push(existingTag._id);
      await existingTag.save();
      await question.save();
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

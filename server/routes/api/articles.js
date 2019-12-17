const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Article = require('../../models/Article');
const User = require('../../models/User');
const ArticleTag = require('../../models/ArticleTag');
const ArticleCategory = require('../../models/ArticleCategory');

// @route    GET api/news
// @desc     Get All Articles (Meta Only)
// @access   Public
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ updated: -1 })
      .select({ uid: 1, slug: 1, author: 1, title: 1, photoURL: 1, summary: 1, category: 1, tags: 1, updated: 1 })
      .populate({
        path: 'author',
        select: 'displayName'
      })
      .populate({
        path: 'category',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/news/latest
// @desc     Get Latest Articles (10)
// @access   Public
router.get('/latest', async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ updated: 1 })
      .limit(10)
      .populate({
        path: 'author',
        select: ['displayName', 'avatar']
      })
      .populate({
        path: 'category',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/news/:uid/:slug
// @desc     Get Article by Id
// @access   Public
router.get('/:uid/:slug', async (req, res) => {
  const findBy = {
    uid: req.params.uid,
    slug: req.params.slug
  };
  try {
    const article = await Article.find(findBy)
      .populate({
        path: 'author',
        select: ['displayName', 'avatar']
      })
      .populate({
        path: 'category',
        select: 'text'
      })
      .populate({
        path: 'tags',
        select: 'text'
      });

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/news/search
// @desc     Search Articles by Search Term
// @access   Public
router.post('/search', async (req, res) => {
  const { term } = req.body;
  try {
    /*
    const articles = await Article.find({ $text: { $search: term } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .select({ uid: 1, slug: 1, author: 1, title: 1, summary: 1, status: 1, published: 1, updated: 1 })
      .populate({
        path: 'author',
        select: 'displayName'
      });
    */

    /*
    const articles = await Article.aggregate([
      {
        $match: {
          $text: {
            $search: term
          }
        }
      },
      {
        $project: {
          uid: 1,
          slug: 1,
          author: 1,
          title: 1,
          summary: 1,
          status: 1,
          published: 1,
          updated: 1,
          score: {
            $meta: 'textScore'
          }
        }
      },
      {
        $match: {
          score: { $gt: 1.0 }
        }
      }
    ]).sort({ score: { $meta: 'textScore' } });
    */
    const articles = await Article.aggregate([
      {
        $searchBeta: {
          search: {
            path: ['title', 'summary', 'rawText'],
            query: term
          },
          highlight: {
            path: ['title', 'summary', 'rawText']
          }
        }
      },
      {
        $project: {
          uid: 1,
          slug: 1,
          author: 1,
          title: 1,
          summary: 1,
          status: 1,
          published: 1,
          updated: 1,
          highlights: { $meta: 'searchHighlights' }
        }
      }
    ]);

    if (!articles) {
      return res.status(404).json({ msg: `No Articles found with the term: "${term}".` });
    }
    res.json({
      count: articles.length,
      articles: articles
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `No Articles found with the term: "${term}".` });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/news
// @desc     Create Article
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('content', 'Content is required.')
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
      const newArticle = new Article({
        slug: req.body.title,
        title: req.body.title,
        content: req.body.description,
        summary: req.body.summary,
        author: req.body.authorId,
        category: req.body.categoryId,
        photoURL: req.body.photoURL || '',
        videoURL: req.body.videoURL || '',
        status: req.body.status || 'Draft'
      });

      // Save article
      const article = await newArticle.save();

      // Handle tags
      if (req.body.tags && req.body.tags.length > 0) {
        let tag;
        for (tag of req.body.tags) {
          tag = tag.toLowerCase().trim();
          let existingTag = await ArticleTag.findOne({ text: tag });
          if (!existingTag) {
            // add new tag if it does nor exist
            const newTag = new Tag({
              text: tag,
              articleCount: 1,
              articles: article._id
            });
            const createdTag = await newTag.save();
            article.tags.push(createdTag._id);
            await article.save();
          } else {
            // update existing tag
            existingTag.articles.push(article._id);
            existingTag.articleCount++;
            article.tags.push(existingTag._id);
            await existingTag.save();
            await article.save();
          }
        }
      }

      // Handle categories
      if (req.body.categories && req.body.categories.length > 0) {
        let category;
        for (category of req.body.categories) {
          category = category.toLowerCase().trim();
          let existingCategory = await ArticleCategory.findOne({ text: category });
          if (!existingCategory) {
            // add new category if it does nor exist
            const newCategory = new Category({
              text: category,
              articleCount: 1,
              articles: article._id
            });
            const createdCategory = await newCategory.save();
            article.categories.push(createdCategory._id);
            await article.save();
          } else {
            // update existing category
            existingCategory.articles.push(article._id);
            existingCategory.articleCount++;
            article.categories.push(existingCategory._id);
            await existingCategory.save();
            await article.save();
          }
        }
      }

      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/news/:article_id
// @desc     Update Article
// @access   Private
router.put(
  '/:article_id',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('description', 'Description is required.')
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
      const article = await Article.findById(req.params.article_id);

      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      const { title, description } = req.body;

      if (title) article.title = title;
      if (description) article.description = description;

      // Handle tags
      // Handle tags in seperate calls
      /*
      LOGIC:
      New Tag array is passed in which may include conditions:
        - New Tag to this article:
          - If Tag exists in Tags:
            - add article id to tag
            - add tag articleCount + 1
          - If Tag is not in Tags:
            - Create new tag
        - Existing Tag in article:
          - No change
        - Removed Tag:
          - If Tag was only assigned to this article:


      */

      /*
      if (tags && tags.length) {
        let tag;
        for (tag of tags) {
          // console.log('tag in loop: ', tag);
          article.tags = [];
          tag = tag.toLowerCase().trim();


          let existingTag = await ArticleTag.findOne({ text: tag });
          if (!existingTag) {
            // add new tag if it does not exist in tags
            const newTag = new Tag({
              text: tag,
              articleCount: 1,
              articles: article._id
            });
            const createdTag = await newTag.save();
            article.tags.push({
              tag: createdTag._id,
              text: tag
            });
          } else {



            // update existing tag if it existed in tags
            const tagExists = existingTag.articles.find(tag => {
              return tag.text === tag;
            });

            if (tagExists) {
              existingTag.articles.push(article._id);
              existingTag.articleCount++;
              await existingTag.save();
            }
            article.tags.push({
              tag: existingTag._id,
              text: tag
            });
          }
        }
      }
      */

      await article.save();
      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/article/:article_id
// @desc     Delete Article
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Check user
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // TODO: Handle orphaned categories and tags

    await article.remove();

    res.json({ msg: 'Article removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/news/like/:article_id
// @desc     Like Article
// @access   Private
router.put('/like/:article_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Check if the article has already been liked by the user
    if (article.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Article already liked by the user' });
    }

    // Check if the article has been unliked by the user
    // If Yes: Remove Unlike
    // If  No: Add Like
    if (article.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove Unlike
      // article.unlikes.pull({ user: req.user.id });
      const removeIndex = article.unlikes.map(vote => vote.user.toString()).indexOf(req.user.id);
      article.unlikes.splice(removeIndex, 1);
    } else {
      // Add Like
      article.likes.unshift({ user: req.user.id });
    }

    // recount likes and save article
    article.likeCount = article.likes.length + article.unlikes.length;
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/news/unlike/:article_id
// @desc     Unlike Article
// @access   Private
router.put('/unlike/:article_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Check if the article has already been unliked by the user
    if (article.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Article already unliked' });
    }

    // Check if the article has been liked by this user
    // If Yes: Remove Like
    // If  No: Add Unlike
    if (article.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove existing down vote
      // console.log('user id: ', req.user.id);
      // article.likes.pull({ user: req.user.id });
      const removeIndex = article.likes.map(vote => vote.user.toString()).indexOf(req.user.id);
      article.likes.splice(removeIndex, 1);
    } else {
      // Add Unlike
      article.unlikes.unshift({ user: req.user.id });
    }

    // recount likes and save article
    article.likeCount = article.likes.length + article.unlikes.length;
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/news/comment/:article_id
// @desc     Comment Article
// @access   Private
router.post(
  '/comment/:article_id',
  [
    auth,
    [
      check('content', 'Content is required')
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
      const user = await User.findById(req.user.id).select('-password');
      const article = await Article.findById(req.params.article_id);

      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      const newComment = {
        user: req.user.id,
        displayName: user.displayName,
        avatar: user.avatar,
        content: req.body.content
      };

      article.comments.unshift(newComment);
      await article.save();
      res.json(article.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/news/comment/:article_id/:comment_id
// @desc     Update Comment
// @access   Private
router.put(
  '/comment/:article_id/:comment_id',
  [
    auth,
    [
      check('content', 'Content is required.')
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
      // Get Article
      const article = await Article.findById(req.params.article_id);

      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      // Get Comment
      const comment = article.comments.find(comment => comment.id === req.params.comment_id);
      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
      }

      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // let article = await Article.findOneAndUpdate(
      //   { _id: req.params.article_id, 'comments._id': req.params.comment_id },
      //   { $set: { content: content } },
      //   { new: true, upsert: true }
      // );

      comment.set({ content: req.body.content });

      await article.save();
      res.json(article.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/news/comment/like/:article_id/:comment_id
// @desc     Like Comment
// @access   Private
router.put('/comment/like/:article_id/:comment_id', auth, async (req, res) => {
  try {
    // Get Article
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Get Comment
    const comment = article.comments.find(comment => comment.id === req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check if the comment has already been liked by the user
    if (comment.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Comment already liked by user' });
    }

    // Check if the comment has been uliked by the user
    // If Yes: Remove Unlike
    // If  No: Add Like
    if (comment.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove Unlike
      // comment.unlikes.pull({ user: req.user.id });
      const removeIndex = comment.unlikes.map(vote => vote.user.toString()).indexOf(req.user.id);
      comment.unlikes.splice(removeIndex, 1);
    } else {
      // Add Like
      comment.likes.unshift({ user: req.user.id });
    }

    // recount likes and save article
    comment.likeCount = comment.likes.length + comment.unlikes.length;
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/news/comment/unlike/:article_id/:comment_id
// @desc     Unlike Comment
// @access   Private
router.put('/comment/unlike/:article_id/:comment_id', auth, async (req, res) => {
  try {
    // Get Article
    const article = await Article.findById(req.params.article_id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Get Comment
    const comment = article.comments.find(comment => comment.id === req.params.comment_id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check if the comment has already been liked by this user
    if (comment.unlikes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Comment already unliked by user' });
    }

    // Check if the comment has been liked by this user
    // If Yes: Remove the like
    // If  No: Add the unlike
    if (comment.likes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
      // Remove like
      // comment.likes.pull({ user: req.user.id });
      const removeIndex = comment.likes.map(vote => vote.user.toString()).indexOf(req.user.id);
      comment.likes.splice(removeIndex, 1);
    } else {
      // Add unlike
      comment.unlikes.unshift({ user: req.user.id });
    }

    // recount likes and save article
    comment.likeCount = comment.likes.length + comment.unlikes.length;
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/news/comment/:article_id/:comment_id
// @desc     Delete Comment
// @access   Private
router.delete('/comment/:article_id/:comment_id', auth, async (req, res) => {
  try {
    // Get Article
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Get Comment
    const comment = article.comments.find(comment => comment.id === req.params.comment_id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    article.comments.pull({ _id: req.params.comment_id });
    await article.save();
    res.json(article.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/news/comment/:id
// @desc     Get Comment by Id
// @access   Public
router.get('/comment/:comment_id', async (req, res) => {
  try {
    const article = await Article.findOne({ 'comments._id': req.params.comment_id });
    const comment = article.comments.find(comment => comment.id === req.params.comment_id);

    // console.log('comment: ', comment);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

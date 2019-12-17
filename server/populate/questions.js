const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const HTMLParser = require('node-html-parser');
const RouteUtil = require('../routes/routeUtil');

const Question = require('../models/Question');
const Tag = require('../models/Tag');
const Category = require('../models/Category');

const questions = require('./data/questions');

const cleanTagsAndCategories = async () => {
  try {
    // Clean Tags
    const allTags = await Tag.find();
    let currentTag;
    for (currentTag of allTags) {
      currentTag.questionCount = 0;
      currentTag.questions = [];
      await currentTag.save();
    }
    console.log('Tags Cleaned...');

    // Clean Categories
    const allCategories = await Category.find();
    let currentCategory;
    for (currentCategory of allCategories) {
      currentCategory.questionCount = 0;
      currentCategory.questions = [];
      await currentCategory.save();
    }
    console.log('Categories Cleaned...');

    // Delete Existing Questions
    const allQuestions = await Question.find();
    let currentQuestion;
    for (currentQuestion of allQuestions) {
      await currentQuestion.remove();
    }
    console.log('Existing Question Deleted...');
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const createQuestion = async quest => {
  try {
    // Populate New Questions
    const { title, tags, category, user, content } = quest;

    const rawTextParse = HTMLParser.parse(content);

    const questionData = {
      title: title,
      category: category,
      user: user,
      content: content,
      rawText: rawTextParse.structuredText.trim()
    };

    questionData.uid = RouteUtil.createUid();
    questionData.slug = RouteUtil.createSlug(title);

    // upsert User
    const newQuestion = await Question.findOneAndUpdate({ title: title }, questionData, { new: true, upsert: true });

    // Handle Tags
    newQuestion.tags = [];
    if (tags && tags.length > 0) {
      let tag;
      for (tag of tags) {
        text = tag.toLowerCase().trim();
        let existingTag = await Tag.findOne({ text: text });
        if (!existingTag) {
          const newTag = new Tag({
            text: text,
            questionCount: 1,
            questions: newQuestion._id
          });
          const createdTag = await newTag.save();
          newQuestion.tags.push(createdTag._id);
        } else {
          existingTag.questions.push(newQuestion._id);
          existingTag.questionCount++;
          newQuestion.tags.push(existingTag._id);
          await existingTag.save();
        }
      }
    }

    // Handle Category
    console.log('category: ', category);
    let questionCategory = await Category.findById(newQuestion.category);
    console.log('questionCategory: ', questionCategory);

    if (!questionCategory.questionCount || questionCategory.questionCount === 0) {
      questionCategory.questionCount = 1;
    } else {
      questionCategory.questionCount++;
    }
    if (!questionCategory.questions) {
      questionCategory.questions = [];
      questionCategory.questions.push(newQuestion._id);
    } else {
      questionCategory.questions.push(newQuestion._id);
    }

    await questionCategory.save();

    await newQuestion.save();

    console.log(newQuestion.title);
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const populateQuestions = async () => {
  try {
    await connectDB();

    await cleanTagsAndCategories();

    let question;
    for (question of questions) {
      await createQuestion(question);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

populateQuestions();

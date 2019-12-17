const dotenv = require('dotenv');
dotenv.config();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const User = require('../models/User');
const moderators = require('./data/moderators');

const createModerator = async moderator => {
  const email = `${moderator.screenName}@kevin-crawford.com`;
  const password = 'SPEDmoderator!';
  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
  const userData = {
    displayName: moderator.displayName,
    screenName: moderator.screenName,
    email: email,
    password: password,
    avatar: avatar,
    roles: ['5db1f8e6167a5b31606e1c02', '5db1f93a167a5b31606e1c03']
  };

  try {
    // upsert User
    const newUser = await User.findOneAndUpdate({ email: userData.email }, userData, { new: true, upsert: true });

    // Handle Password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    console.log(newUser.email);
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const populateModerators = async () => {
  try {
    await connectDB();
    let moderator;
    for (moderator of moderators) {
      await createModerator(moderator);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

populateModerators();

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const gravatar = require('gravatar');

const User = require('../models/User');
const Profile = require('../models/Profile');

const users = require('./data/users');

const createUser = async user => {
  try {
    const { name, email, profileProgress } = user;

    // upsert User
    const testUser = await User.findOne({ email: email });
    if (!testUser) {
      console.log(email);
      var avatar;
      if (user.photoUrl !== '/assets/img/sped-avatar.svg') {
        avatar = user.photoUrl;
      } else {
        avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
      }
      const userData = {
        email: email.toLowerCase(),
        displayName: name,
        avatar: avatar,
        password: 'sped-migrating',
        roles: ['5db1f8e6167a5b31606e1c02']
      };
      const newUser = new User(userData);
      await newUser.save();
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const populateUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany({ password: 'sped-migrating' });

    let key;
    let keys = Object.keys(users);
    for (key of keys) {
      const user = users[key];
      await createUser(user);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

populateUsers();

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const gravatar = require('gravatar');

const Org = require('../models/Organization');

const organizations = require('./data/organizations');

const createUser = async org => {
  try {
    const { name, addrStreet, addrCity, addrState, lat, lng } = org;

    const locationData = {
      street: addrStreet,
      city: addrCity,
      state: addrState,
      zip: addrZip,
      lat: lat.data || 42.2621,
      lng: lng.data || -71.1101
    };

    const orgData = {
      name: name
    };

    // upsert User
    const testUser = await User.findOne({ email: email });
    if (!testUser) {
      console.log(email);
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
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

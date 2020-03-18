const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');

const Org = require('../models/Organization');
const Job = require('../models/Job');
const Location = require('../models/Location');

let BreakException = {};

const swap = async (err, doc) => {
  try {
    if (err) throw BreakException;
    const lat = doc.loc.coordinates[0];
    const lng = doc.loc.coordinates[1];
    doc.loc.coordinates = [lng, lat];
    await doc.save();
  } catch (error) {
    console.log(error.message);
  }
};

const fixLatLng = async () => {
  try {
    await connectDB();
    let jobs = await Job.find();
    for (let doc of jobs) {
      const lat = doc.loc.coordinates[0];
      const lng = doc.loc.coordinates[1];
      const getDoc = await Job.findById(doc._id);
      getDoc.loc.coordinates = [lng, lat];
      await getDoc.save();
    }
    console.log('jobs done');

    const orgs = await Org.find({});
    for (let doc of orgs) {
      const lat = doc.loc.coordinates[0];
      const lng = doc.loc.coordinates[1];
      const getDoc = await Org.findById(doc._id);
      getDoc.loc.coordinates = [lng, lat];
      await getDoc.save();
    }
    console.log('orgs done');

    let locs = await Location.find();
    for (let doc of locs) {
      const lat = doc.loc.coordinates[0];
      const lng = doc.loc.coordinates[1];
      const getDoc = await Location.findById(doc._id);
      getDoc.loc.coordinates = [lng, lat];
      await getDoc.save();
    }
    console.log('locations done');
    return undefined;
  } catch (error) {
    if (error !== BreakException) throw error;
  }
};

fixLatLng();

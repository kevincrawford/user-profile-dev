const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const applications = require('./data/scholarshipApplications');
const Application = require('../models/ScholarshipApplication');

const createApplication = async application => {
  console.log('start: ', application.userId);
  const applicationData = {
    user: application.userId.toLowerCase().trim(),
    scholarshipName: application.scholarshipId.trim(),
    school: application.school.trim(),
    essay: application.essay,
    likeCount: 1,
    graduation: application.graduationDate
  };

  try {
    let query = { user: applicationData.user },
      update = applicationData,
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await Application.findOneAndUpdate(query, update, options);
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const doApplications = async () => {
  try {
    await connectDB();
    const keys = Object.keys(applications);
    for (const key of keys) {
      await createApplication(applications[key]);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

doApplications();

const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');

const Job = require('../models/Job');
const Location = require('../models/Location');
const jobs = require('./data/jobs');

/*
org
_id: 5e70f7d8dc86bd0017c6eb04
location: 5e70f7d8dc86bd0017c6eb02

user
_id: 5dd6ab6d1c88162a78f192e8

*/
const createJob = async job => {
  try {
    if (job.organizationId === 'nashua-school-district') {
      console.log(job.title);
      const loc = await Location.findById('5e70f7d8dc86bd0017c6eb02');
      let jobData = {
        jobId: job.jobId,
        status: job.status,
        title: job.title,
        salaryPeriod: job.salaryPeriod,
        salaryAmount: job.salaryAmount,
        summary: job.summary,
        description: job.description,
        jobType: job.jobType,
        location: '5e70f7d8dc86bd0017c6eb02',
        location: loc.loc,
        organization: '5e70f7d8dc86bd0017c6eb04',
        jobAdmin: '5dd6ab6d1c88162a78f192e8'
      };
      const newJob = new Job(jobData);
      await newJob.save();
    } else {
      console.log('not nashua-school-district');
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
};

const populateJobs = async () => {
  try {
    await connectDB();
    let counter = 1;
    const keys = Object.keys(jobs);
    for (const key of keys) {
      if (counter < 2) {
        console.log('jobs[key]: ', jobs[key]);
        console.log('jobs[key].title: ', jobs[key].title);
        counter++;
      }
      await createJob(jobs[key]);
    }
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  } finally {
    process.exit();
  }
};

populateJobs();

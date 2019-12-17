// import axios from 'axios';
import * as qs from 'query-string';
import * as request from 'request-promise-native';
import { parse } from 'node-html-parser';
import { FETCH_BACKFILL_JOBS } from './jobsConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../common/actions/async/asyncActions';

// q: ui developer
// l: Austin, TX
// r: 50
// action: request_for_listings
// page: 1

const defaultParams = {
  q: 'special education teacher',
  l: 'Chicago, IL, USA',
  r: 50,
  action: 'request_for_listings',
  page: 1
};

const checkNode = node => {
  return node ? node.innerHTML.trim() : '';
};

export const fetchBackfillJobs = params => {
  const requestParams = params ? params : defaultParams;
  requestParams.r = requestParams.r ? requestParams.r : 50;
  requestParams.action = 'request_for_listings';
  requestParams.page = requestParams.page ? requestParams.page : 1;
  const queryString = qs.stringify(requestParams);
  const requestUrl = `https://hiteacherhunters.com/ajax/?${queryString}`;
  // console.log(requestUrl);

  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const jobPage = await request.get(requestUrl);

      // Process Page
      const root = parse(jobPage);
      const jobList = root.querySelectorAll('article');
      let jobs = [];
      let job;
      for (job of jobList) {
        let data = {};
        data.link = job.querySelector('a').attributes.href;
        data.title = job.querySelector('a').structuredText.trim();
        data.company = job.querySelector('.listing-item__info--item-company').structuredText.trim();
        data.location = checkNode(job.querySelector('.listing-item__info--item-location'));
        data.description = job.querySelector('.hidden-sm').structuredText.trim();
        data.date = job.querySelector('.listing-item__date').structuredText.trim();
        jobs.push(data);
      }

      dispatch({
        type: FETCH_BACKFILL_JOBS,
        payload: jobs
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

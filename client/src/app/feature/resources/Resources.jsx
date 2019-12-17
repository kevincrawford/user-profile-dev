import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const mapState = state => ({});

const actions = {};

export class Resources extends Component {
  render() {
    return (
      <>
        <h1>Resources</h1>
        <div className='flex-box md mt-3 resources'>
          <div className='grow'>
            <h5>
              <strong>Special Educator Services</strong>
            </h5>
            <p>
              SPEDxchange provides original and shared content that helps SPEDucators improve the quality of their services. For students that will be graduating soon we offer
              career coaching, valuable content, information on school districts and current open positions.
            </p>
            <p>
              We understand that there is a growing special education shortage nationwide and school districts are struggling to find the qualified special education staff that
              they need.
            </p>
            <p>
              We offer school district administrators content and a unique and effective platform for them to find the right candidates for their school districts open positions.
            </p>
            <h5 className='mt-5' tabindex='0'>
              <strong>Special Education Scholarships</strong>
            </h5>
            <p>
              <Link to='/scholarships/clinical'>Clinical Special Educators Scholarship Award $1,000</Link>
            </p>
          </div>
          <div className='spacer'></div>
          <div className='grow'>
            <h5>
              <strong>Administrator Services</strong>
            </h5>
            <p>We are a specialized job board and a growing community full of resources, networking opportunities and valuable content.</p>
            <p>We help solve school District staff Shortages and Staffing problems.</p>
            <p>
              Traditional methods and job board “posting and praying” has resulted in marginal outcomes. If candidates do not find your districts job postings or if they are
              unaware of your district’s unique strengths and benefits, they may never apply. Your special education vacancies will be invisible to the special education community.
              We believe in methods that increase successful outcomes.
            </p>
            <h5>
              <strong>SPEDxchange Connects your school district vacancies with the Precise Staff You need:</strong>
            </h5>
            <p>
              You need to get your job vacancies in front of the candidates that matter, seasoned professionals and new graduates that are just getting ready to graduate. Hard to
              find candidates are making their plan to find their first jobs a priority. Don’t miss them!
            </p>
            <h5>
              <strong>SPEDxchange makes your school district become more social and more visible online and mobile:</strong>
            </h5>
            <p>
              Social media is constantly evolving, and it is imperative that your district uses social media to find hard to find licensed special education staff. This can be
              overwhelming for a school district of any size. SPEDxchange connects you to both active and passive candidates when they are online from Instagram, Facebook,
              LinkedIn, Twitter and our own specialized website using a comprehensive SEO strategy.
            </p>
            <p>
              Our community of new recruits and special education professionals will learn about your district and your vacancies early in their job search process. We will help
              your district cultivate your brand and we keep candidates up to date about positions that they are qualified to fill.
            </p>
            <p>
              We provide a comprehensive network of special education staff many that have the licenses and credentials to work with your most unique special education caseloads.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(mapState, actions)(Resources));

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

import NavBar from '../../common/ui/nav/navBar/NavBar';
import SearchBar from '../../feature/search/searchBar/SearchBar';
import AppFooter from '../../common/ui/footer/AppFooter';
import NavMobile from '../../common/ui/nav/navMobile/NavMobile';

import heroImg from './bg-home.png';
import newsImg from './speducator-reading.jpg';

const hero = {
  backgroundImage: `url(${heroImg}), linear-gradient(135deg, rgb(103, 28, 142) 0%, rgb(0, 102, 70) 96%)`
};

const news = {
  backgroundImage: `url(${newsImg})`
};

const HomePage = ({ history }) => {
  return (
    <>
      <NavBar />
      <SearchBar />

      <section className='home-section hero' style={hero}>
        <Container>
          <h5>
            <em>The Community for Special Education Answers</em>
          </h5>
          <h2>
            We empower SPEDucation
            <br />
            and connect people to solutions
            <br />
            that enable growth and discovery.
          </h2>
          <div className='actions'>
            <Button onClick={() => history.push('/news')}>For Educators</Button>
            <Button color='purple' onClick={() => history.push('/news')}>
              For Students
            </Button>
            <Button color='green' onClick={() => history.push('/news')}>
              For Schools
            </Button>
          </div>
        </Container>
      </section>

      <section className='home-section news' style={news}>
        <Container>
          <h2>
            Latest News
            <br />
            and Updates
          </h2>
          <p>
            We have extensive informations related to special education. Get valuable insights from our social media,
            blogs, and unique content from our partners and our community.
          </p>
          <p>
            <span className='text-warning'>Sign up</span> today and you will also have access to exclusive content.
          </p>
          <Button color='purple' onClick={() => history.push('/news')}>
            Read Our Latest news...
          </Button>
        </Container>
      </section>

      <section className='home-section shortage'>
        <Container>
          <h2>How does the nationwide shortage of special education staff affect you?</h2>
          <p>
            <strong>Let’s do something about it together!</strong>
          </p>
          <p>
            Our team is diverse, and we have over 30 years of special education staffing experience. Our sophisticated
            understanding of special education job placement and challenges are successful. We are not recruiters, we
            are experts in the process of matching districts and open positions. We use our technology and social media
            community to make that happen.
          </p>
          <Button color='orange' onClick={() => history.push('/about')}>
            Learn More!
          </Button>
        </Container>
      </section>

      <section className='home-section resources'>
        <Container>
          <h2>SPED&nbsp;Resources You&nbsp;Need</h2>
          <p>Check out what you can do by becoming a SPEDxchange member today!</p>
          <div className='flex-box sm callout'>
            <div className='grow'>
              <i className='icon-present text-primary'></i>
              <h3>Latest SPED Trends</h3>
              <p>We offer free specialized content that will help special education staff.</p>
            </div>
            <div className='grow'>
              <i className='icon-lock-open text-primary'></i>
              <h3>Alerts &amp; Notification</h3>
              <p>Let us do the work based on your preferences. We'll keep you up-to-date!</p>
            </div>
          </div>
          <div className='flex-box sm callout'>
            <div className='grow'>
              <i className='icon-camera'></i>
              <h3>Career Portfolio</h3>
              <p>Get organized for a successful job search, discovery, relocation, and hiring process.</p>
            </div>
            <div className='grow'>
              <i className='icon-screen-smartphone'></i>
              <h3>Job Matching</h3>
              <p>Better understand the job market and openings across the united states.</p>
            </div>
          </div>
          <Button color='blue' onClick={() => history.push('/resources')}>
            Visit Our Resource Center...
          </Button>
        </Container>
      </section>

      <div className='footer-wrap'>
        <AppFooter />
      </div>
      <NavMobile />
    </>
  );
};

/*
      <section className='home-section sectionname'>
        <Container>
          <h2>header</h2>
          <p>
            Paragraph text here<br />
            with line break
          </p>
          <Button color='purple'>Action</Button>
        </Container>
      </section>

*/

export default withRouter(HomePage);

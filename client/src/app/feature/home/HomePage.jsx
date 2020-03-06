import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';

import NavBar from '../../common/ui/nav/navBar/NavBar';
import SearchBar from '../../feature/search/searchBar/SearchBar';
import AppFooter from '../../common/ui/footer/AppFooter';
import NavMobile from '../../common/ui/nav/navMobile/NavMobile';

import heroImg from './bg-home.png';
import newsImg from './speducator-reading.jpg';
import proImg from './educator.jpg';

const hero = {
  backgroundImage: `url(${heroImg}), linear-gradient(135deg, rgb(103, 28, 142) 0%, rgb(0, 102, 70) 96%)`
};

const news = {
  backgroundImage: `url(${newsImg})`
};

const pro = {
  backgroundImage: `url(${proImg})`
};

const scrollToRef = ref => window.scrollTo({ top: ref.current.offsetTop - 40, behavior: 'smooth' });

const HomePage = ({ history, openModal }) => {
  const studentRef = useRef(null);
  const teacherRef = useRef(null);
  const adminRef = useRef(null);
  return (
    <>
      <NavBar />
      <SearchBar />

      <section className='home-section hero' style={hero}>
        <Container>
          <h2>
            The Community for
            <br />
            Special Education Answers,
            <br />
            Resources, and Jobs
          </h2>
          <div className='actions'>
            <Button color='purple' onClick={() => scrollToRef(studentRef)}>
              For SPED University Students
            </Button>
            <Button color='green' onClick={() => scrollToRef(teacherRef)}>
              For Special Education Professionals
            </Button>
            <Button onClick={() => scrollToRef(adminRef)}>For School Admins &amp; HR Managers</Button>
            <Button color='blue' onClick={() => history.push('/questions')}>
              For SPED Related Questions
            </Button>
          </div>
        </Container>
      </section>

      <section ref={studentRef} className='home-section news' style={news}>
        <Container>
          <h2>Future Graduates</h2>
          <p>
            The field of special education is waiting for you! Whether you have just taken your first university class
            or are preparing for your first job, we, at SPEDxchange, know you are going to make an impact!
          </p>
          <p>
            <strong onClick={() => openModal('RegisterModal')}>Sign up</strong> today and you will also have access to
            exclusive content and more...
          </p>
          <ul>
            <li>
              Get answers to your questions, provide input, and share feedback on the special education issues that
              matter to you
            </li>
            <li>Connect with other members in the special education field</li>
            <li>Find scholarship opportunities nationwide</li>
            <li>Prepare yourself for the job search and preparation process</li>
            <li>Receive job alerts for the programs and locations that are attractive to you</li>
          </ul>
          <Button color='purple' onClick={() => openModal('RegisterModal')}>
            Sign Up Today
          </Button>
        </Container>
      </section>

      <section ref={adminRef} className='home-section shortage'>
        <Container>
          <h2>
            Hire the qualified
            <br />
            special education staff
            <br />
            you need!
          </h2>
          <p>
            <strong>
              Our platform and candidate engagement
              <br />
              will help your district:
            </strong>
          </p>
          <ul>
            <li>Expand your districts visibility to qualified candidates locally and nationwide</li>
            <li>Secure future graduates earlier than your competition</li>
            <li>Leverage social media actively to increase candidate’s awareness of your open positions</li>
            <li>Increase the inbound traffic of special education candidates to your district’s website</li>
            <li>Build and curate your districts Brand across social media and ongoing online presence</li>
          </ul>
          <p>
            SPEDxchange offers new methods to source and attract candidates to your district.{' '}
            <strong onClick={() => openModal('ContactModal')}>Contact us</strong> today to advance your chances for
            success in this intense and short hiring window.
          </p>
          <p>
            <em>Make your SPED staff more consistent year over year, within budget, dependable and loyal.</em>
          </p>
          <Button color='orange' onClick={() => openModal('RegisterModal')}>
            Join Today
          </Button>
        </Container>
      </section>

      <section ref={teacherRef} className='home-section professional' style={pro}>
        <Container>
          <div className='wide'>
            <h2>SPED Professionals</h2>
            <p>
              At SPEDxchange, we understand the demands special educators and clinical special education professionals
              face daily, and we support you. We are the special education community you can turn to for answers. Build
              connections with other professionals while sharing your insights, knowledge, and experiences. Our unique
              question and answer platform is a community you can count on for support and feedback on complex
              situations. At SPEDxchange, we believe that discovery and growth come from seeking answers and working
              together to find solutions.
            </p>
            <p className='hidden-sm'>
              While SPEDxchange is first and foremost a community to support special education professionals as they
              grow in their careers, it also can support you in the job search process. Throughout your career, your
              definition of a dream job may change. Build your profile, post your resume, and set job criteria in order
              to locate and secure the dream job for the next chapter of your career.
            </p>
          </div>
          <div className='narrow'>
            <h4>CAREER</h4>
            <p>
              Make a change to land your dream job for your next chapter!{' '}
              <span className='link' onClick={() => history.push('/jobs')}>
                Search for Jobs
              </span>
            </p>
            <h4>COMMUNITY</h4>
            <p>
              Connect with others special education students and professionals to learn and grow{' '}
              <span className='link' onClick={() => history.push('/questions')}>
                Ask Questions
              </span>
            </p>
            <h4>KNOWLEDGE</h4>
            <p>
              Dig into our archives of articles and information to learn more about topics of interest to you{' '}
              <span className='link' onClick={() => history.push('/news')}>
                Latest News
              </span>
            </p>
          </div>

          <Button color='green' onClick={() => openModal('RegisterModal')}>
            Join Today
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

const mapState = state => ({});

const actions = {
  openModal
};

export default connect(mapState, actions)(withRouter(HomePage));

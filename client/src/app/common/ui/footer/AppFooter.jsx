import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';

const AppFooter = () => {
  return (
    <div className='main-footer'>
      <Container>
        <div className='flex-box sm'>
          <div>
            <h6>SPEDxchange</h6>
            <Link to='/about'>About Us</Link>
            <Link to='/contact'>Contact Us</Link>
          </div>
          <div>
            <h6>Special Educators</h6>
            <Link to='/jobs'>Find a Job</Link>
            <Link to='/profile'>Post a Resume</Link>
            <Link to='/resources'>Resources</Link>
          </div>
          <div>
            <h6>SPED Employers</h6>
            <Link to='/dashboard/job/new'>Post a Job</Link>
            <Link to='/resources'>Resources</Link>
          </div>
          <div className='social'>
            <h6>Connect</h6>
            <a href='https://twitter.com/SPEDxchange_llc' target='_blank' rel='noopener noreferrer'>
              <Icon fitted name='twitter' />
              &nbsp; Twitter
            </a>
            <a href='https://www.facebook.com/SPEDxchange' target='_blank' rel='noopener noreferrer'>
              <Icon fitted name='facebook' />
              &nbsp; Facebook
            </a>
            <a href='https://www.linkedin.com/in/johnconsalvi/' target='_blank' rel='noopener noreferrer'>
              <Icon fitted name='linkedin' />
              &nbsp; LinkdIn
            </a>
            <a href='https://www.instagram.com/SPEDxchange_llc/' target='_blank' rel='noopener noreferrer'>
              <Icon fitted name='instagram' />
              &nbsp; Instagram
            </a>
          </div>
          <div className='col-md mb-3'>
            <h6>Legal</h6>
            <a href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5' target='_blank' rel='noopener noreferrer'>
              Privacy Policy
            </a>
            <a href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53' target='_blank' rel='noopener noreferrer'>
              Terms of Use
            </a>
          </div>
        </div>
        <div className='flex-box sm legal'>
          <div className='grow'>
            <strong>SPEDxchange</strong> | 1740 Ridge Ave, Suite 500 | Evanston Il, 60201 | <a href='tel:1-224-300-7733'>224.300.7733</a>
          </div>
          <div>&copy; Copyright 2019 SPEDxchange</div>
        </div>
      </Container>
    </div>
  );
};

export default AppFooter;

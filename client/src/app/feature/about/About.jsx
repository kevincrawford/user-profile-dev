import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../common/ui/modal/ModalActions';

export class About extends Component {
  render() {
    return (
      <div className='about-us'>
        <h1>
          <strong>About Us</strong>
        </h1>
        <p>
          SPEDxchange is an online community of special education teachers, Speech- Language Pathologists, Occupational Therapists, School Psychologists, School District
          Administrators and other staff that service special education students and their families.
        </p>
        <p>SPEDxchange is transforming and improving the way special educators, school districts and parents connect with each other.</p>
        <p>We hope that you enjoy our site and resources.</p>
        <p>Sincerely,</p>
        <p>
          <strong>John Consalvi</strong>
          <br />
          <span>CCC-SLP</span>
          <br />
          <span>CEO/Founder</span>
          <br />
        </p>
      </div>
    );
  }
}

const mapState = state => ({});

const actions = { openModal };

export default connect(mapState, actions)(About);

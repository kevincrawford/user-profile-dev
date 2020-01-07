import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';

const mapState = state => ({
  auth: state.auth
});

const actions = {
  openModal
};

export class ScholarshipTeacher extends Component {
  handleSocialClick = type => {
    const url = window.location.protocol + '//' + window.location.host + '/scholarships/teacher';
    if (type === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=SPEDxchange:%202020%20Special%20Education%20Teacher%20Scholarship%20$1,000&amp;url=${url}`,
        'twitter-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'linkedin') {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&amp;url=${url}&amp;title=Special%20Education%20Teacher%20Scholarship%20$1,000`,
        'linkedin-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=600,height=480');
    }
  };

  setEmailLink = () => {
    const url = window.location.protocol + '//' + window.location.host + '/scholarships/teacher';
    return `mailto:?subject=2020%20Special%20Education%20Teacher%20Scholarship%20$1,000&body=I thought you might be interested in reading this SPED Talk article.%0D%0A%0D%0A2020%20Special%20Education%20Teacher%20Scholarship%20$1,000%0D%0A${url}%0D%0A%0D%0A`.replace(
      / /g,
      '%20'
    );
  };

  handleLogin = () => {
    this.props.openModal('UnauthModal');
  };

  handleApply = () => {
    if (this.props.auth.authenticated) {
      this.props.openModal('ScholarshipModal', 'teacher');
    } else {
      this.props.openModal('UnauthModal');
    }
  };

  render() {
    return (
      <div className='article-wrap'>
        <div className='article'>
          <div>
            <h1>
              2020 Special Education Teacher Scholarship - <small>$</small>1,000
            </h1>
            <div>
              <img src='/assets/img/scholarship.png' alt='Special Education Teacher Scholarship' />
            </div>
          </div>
          <div className='article-figure'>
            <div className='share'>SHARE</div>
            <Icon link circular name='twitter' onClick={() => this.handleSocialClick('twitter')} />
            <Icon link circular name='linkedin' onClick={() => this.handleSocialClick('linkedin')} />
            <Icon link circular name='facebook' onClick={() => this.handleSocialClick('facebook')} />
            <a href={this.setEmailLink()}>
              <Icon link circular name='envelope outline' />
            </a>
          </div>
          <p>SPEDxchange is offering a $1,000 scholarship for undergraduate or graduate students that are interested in working with special needs students.</p>
          <p>This award is for undergraduate or graduate students that are pursuing a degree in following special education or a related fields:</p>
          <p>
            <strong>Special Education Teacher</strong>
            <br />
            <strong>Special Education Diagnosticians</strong>
            <br />
            <strong>Teachers of the Deaf and Hard of Hearing</strong>
            <br />
            <strong>Teachers of the Visually Impaired</strong>
          </p>
          <p>Applications will be accepted until September 15, 2020.</p>
          <p>
            <em>
              <strong>Winner will be announced on October 15, 2020.</strong>
            </em>
          </p>
          <Button color='green' className='mb-3' onClick={this.handleApply}>
            Apply Today
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(ScholarshipTeacher);

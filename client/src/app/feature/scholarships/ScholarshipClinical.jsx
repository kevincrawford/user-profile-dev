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

export class ScholarshipClinical extends Component {
  handleSocialClick = type => {
    const url = window.location.protocol + '//' + window.location.host + '/scholarships/clinical';
    if (type === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=SPEDxchange:%20Clinical%20Special%20Educators%20Scholarship%20Award%20$1,000&amp;url=${url}`,
        'twitter-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'linkedin') {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&amp;url=${url}&amp;title=Clinical%20Special%20Educators%20Scholarship%20Award%20$1,000`,
        'linkedin-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=600,height=480');
    }
  };

  setEmailLink = () => {
    const url = window.location.protocol + '//' + window.location.host + '/scholarships/clinical';
    return `mailto:?subject=Clinical%20Special%20Educators%20Scholarship%20Award%20$1,000&body=I thought you might be interested in reading this SPED Talk article.%0D%0A%0D%0AClinical%20Special%20Educators%20Scholarship%20Award%20$1,000%0D%0A${url}%0D%0A%0D%0A`.replace(
      / /g,
      '%20'
    );
  };

  handleLogin = () => {
    this.props.openModal('UnauthModal');
  };

  handleApply = () => {
    if (this.props.auth.authenticated) {
      this.props.openModal('ScholarshipModal');
    } else {
      this.props.openModal('UnauthModal');
    }
  };

  render() {
    return (
      <div className='article-wrap'>
        <div className='article'>
          <div>
            <h1>Clinical Special Educators Scholarship Award $1,000</h1>
            <div>
              <img src='/assets/img/scholarship.png' alt='Clinical Special Educators Scholarship Award' />
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
          <h4 className='mt-0 pt-0'>
            <strong>Scholarship for Clinical Undergraduate or Graduate Students that want to work in Public Schools Settings</strong>
          </h4>
          <p>
            SPEDxchange Clinical Award Scholarship is offered to one student each year. The scholarship awards one chosen applicant the sum of $1,000 and provides a $2,000 donation
            to the University Program in which the student attends.
          </p>
          <p>
            <strong>Criteria for Entering Student Scholarship:</strong>
          </p>
          <p>
            Every applicant that is currently enrolled at a university and is focusing on working with special education students is encouraged to apply. The following factors are
            considered when awarding the scholarship:
          </p>
          <ul>
            <li>Applicant's personal statement that reflects upon the questions: "How do I intend on impacting the lives of my future students?".</li>
            <li>The applicant has an interest in working in public schools upon graduation.</li>
          </ul>
          <p>Applications will be accepted from June 15, 2019 until December 15 , 2019.</p>
          <p>
            <em>
              <strong>Award recipients will be announced January 15, 2020.</strong>
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

export default connect(mapState, actions)(ScholarshipClinical);

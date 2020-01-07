import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Clinical2020 = () => {
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
      </div>
    </div>
  );
};

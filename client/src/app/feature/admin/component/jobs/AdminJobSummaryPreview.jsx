import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import moment from 'moment/moment.js';

const mapState = state => ({
  job: state.admin.job,
  org: state.admin.org
});

const actions = {};

export class AdminJobSummaryPreview extends Component {
  render() {
    const {
      name,
      location: { city, state }
    } = this.props.org;
    const { jobType, title, summary, updated } = this.props.job;
    return (
      <div className='job-post-full grow'>
        <div className='preview-wrap'>
          <div className='flex-box between'>
            <h5 className='grow pr-5'>{title}</h5>
            <div className='bookmark-section'>
              <Icon link color='blue' name='bookmark outline' />
              <span className='link'>SAVE</span>
            </div>
          </div>
          <div className='info'>
            <Label>
              <Icon inline name='building outline' />
              {name}
            </Label>
            <Label>
              <Icon inline name='map marker alternate' />
              {city}, {state}
            </Label>
            <Label>
              <Icon inline name='clock outline' />
              Posted: {moment(updated).from()}
            </Label>
            <Label>
              <Icon inline name='user outline' />
              {jobType}
            </Label>
          </div>
          <div>{summary}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(AdminJobSummaryPreview);

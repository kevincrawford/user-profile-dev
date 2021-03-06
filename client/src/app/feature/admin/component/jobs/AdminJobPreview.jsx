import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Label } from 'semantic-ui-react';
import moment from 'moment/moment.js';

const mapState = state => ({
  job: state.admin.job,
  org: state.admin.org
});

const actions = {};

export class AdminJobPreview extends Component {
  render() {
    const {
      name,
      location: { city, state }
    } = this.props.org;
    const { jobType, title, description, updated } = this.props.job;
    return (
      <div className='job-post-full grow'>
        <div className='preview-wrap'>
          <div className='flex-box between'>
            <h4 className='grow pr-5'>{title}</h4>
            <div className='bookmark-section'>
              <Icon link size='large' color='blue' name='bookmark outline' />
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
          <div className='apply-section'>
            <Button type='button' color='blue'>
              Apply
            </Button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(AdminJobPreview);

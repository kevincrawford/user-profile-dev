import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Label } from 'semantic-ui-react';
import moment from 'moment/moment.js';
import { fetchJob, fetchOrg } from '../admin/AdminActions';
import Loading from '../../common/ui/loading/Loading';

export class JobDetailPage extends Component {
  componentDidMount() {
    console.log('JobDetailPage: id: ', this.props.match.params.id);
    this.props.fetchJob(this.props.match.params.id);
  }

  render() {
    const { loading, loadingEl } = this.props;
    if (
      loading ||
      loadingEl === 'fetch-job' ||
      !this.props.job ||
      !this.props.job._id ||
      !this.props.org ||
      !this.props.org._id
    )
      return <Loading />;
    const {
      name,
      location: { city, state }
    } = this.props.org;
    const { jobType, title, description, applyLink, updated } = this.props.job;
    return (
      <div className='job-post-full'>
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
          {applyLink && (
            <div className='apply-section'>
              <Button type='button' href={applyLink} color='blue'>
                Apply
              </Button>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.async.loading,
  loadingEl: state.async.elementName,
  job: state.admin.job,
  org: state.admin.org
});

const mapDispatchToProps = {
  fetchJob
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailPage);

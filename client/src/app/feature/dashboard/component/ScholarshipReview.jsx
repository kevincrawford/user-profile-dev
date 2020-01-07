import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadScholarshipApplications,
  filterScholarshipApplications,
  sortScholarshipApplications,
  voteScholarshipApplication
} from '../DashboardActions';
import Loading from '../../../common/ui/loading/Loading';
import { Button, Icon } from 'semantic-ui-react';

const mapState = state => ({
  applications: state.dashboard.applications,
  applicationFilters: state.dashboard.applicationFilters,
  filteredApplications: state.dashboard.filteredApplications
});

const actions = {
  loadScholarshipApplications,
  filterScholarshipApplications,
  voteScholarshipApplication,
  sortScholarshipApplications
};

export class ScholarshipReview extends Component {
  componentDidMount() {
    const { scholarshipName } = this.props.match.params;
    this.props.loadScholarshipApplications(
      scholarshipName,
      this.props.applicationFilters
    );
  }

  handleFilterApplications(key) {
    let filters = this.props.applicationFilters;
    switch (key) {
      case 'all':
        filters = {};
        break;
      case 'reviewed':
        filters = { reviewed: true };
        break;
      case 'unreviewed':
        filters = { reviewed: false };
        break;
      default:
        filters = {};
    }
    this.props.filterScholarshipApplications(filters);
  }

  handleLike(id, vote) {
    this.props.voteScholarshipApplication(id, vote);
  }

  render() {
    const { loading, filteredApplications } = this.props;
    if (loading) return <Loading />;
    return (
      <>
        <div className='flex-box bottom'>
          <h4 className='grow'>Applications</h4>
          <div>
            <Button
              positive
              size='mini'
              onClick={() => this.props.sortScholarshipApplications()}
            >
              Sort
            </Button>
          </div>
        </div>
        {filteredApplications &&
          filteredApplications.map(application => (
            <div key={application._id}>
              <hr />
              <div className='flex-box sm'>
                <div className='grow pr-3 pb-3'>
                  <div
                    dangerouslySetInnerHTML={{ __html: application.essay }}
                  />
                </div>
                <div>
                  <button className='ui button mr-2 px-3'>
                    <span className='text-black'>
                      <strong>{application.likeCount}</strong>
                    </span>
                  </button>
                  <Button
                    icon
                    className='mr-2'
                    onClick={() => this.handleLike(application._id, 1)}
                  >
                    <Icon name='thumbs up' color='green' />
                  </Button>
                  <Button
                    icon
                    className='mr-0'
                    onClick={() => this.handleLike(application._id, -1)}
                  >
                    <Icon name='thumbs down' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        <hr />
      </>
    );
  }
}
export default connect(mapState, actions)(ScholarshipReview);

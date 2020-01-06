import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadScholarshipApplications, filterScholarshipApplications, voteScholarshipApplication } from '../DashboardActions';
import Loading from '../../../common/ui/loading/Loading';
import { Button, Icon } from 'semantic-ui-react';

export class ScholarshipReview extends Component {
  componentDidMount() {
    const { scholarshipName } = this.props.match.params;
    this.props.loadScholarshipApplications(scholarshipName, this.props.applicationFilters);
  }

  handleFilterApplications(key, value) {
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
    // console.log('handleLike: ', id, vote);
    this.props.voteScholarshipApplication(id, vote);
  }

  byCount(a, b) {
    return b.likeCount - a.likeCount;
  }

  render() {
    const { loading, filteredApplications } = this.props;
    if (loading) return <Loading />;
    return (
      <>
        <div className='flex-box bottom'>
          <h4 className='grow'>Applications</h4>
          <div>
            <Button.Group basic size='mini'>
              <Button>All</Button>
              <Button>Unreviewed</Button>
              <Button>Reviewed</Button>
            </Button.Group>
          </div>
        </div>
        {filteredApplications &&
          filteredApplications.sort(this.byCount).map(application => (
            <div key={application._id}>
              <hr />
              <div className='flex-box sm'>
                <div className='grow pr-3'>
                  <div dangerouslySetInnerHTML={{ __html: application.essay }} />
                </div>
                <div>
                  <Button icon className='mr-2' onClick={() => this.handleLike(application._id, 1)}>
                    <Icon name='thumbs up' color='green' />
                  </Button>
                  <Button icon className='mr-2' onClick={() => this.handleLike(application._id, -1)}>
                    <Icon name='thumbs down' />
                  </Button>
                  <button className='ui button mr-0 px-3'>
                    <span className='text-black'>
                      <strong>{!application.likeCount ? '0' : application.likeCount.toString()}</strong>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        <hr />
      </>
    );
  }
}

const mapStateToProps = state => ({
  applications: state.dashboard.applications,
  applicationFilters: state.dashboard.applicationFilters,
  filteredApplications: state.dashboard.filteredApplications
});

const mapDispatchToProps = {
  loadScholarshipApplications,
  filterScholarshipApplications,
  voteScholarshipApplication
};

/*
<Form>
  <Button icon>
    <Icon name='thumbs up' />
  </Button>
  <Button icon>
    <Icon name='thumbs down' />
  </Button>
  <Form.Field size='mini' style={valueStyle}>
    <input type='number' style={inputStyle} />
  </Form.Field>
</Form>
*/

export default connect(mapStateToProps, mapDispatchToProps)(ScholarshipReview);

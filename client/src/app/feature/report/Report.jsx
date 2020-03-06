import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './ReportActions';
import Loading from '../../common/ui/loading/Loading';

import ReportUsersTable from './component/ReportUsersTable';
import ReportApplicantTable from './component/ReportApplicantTable';

export class Report extends Component {
  constructor(props) {
    super(props);

    this.props.fetchUsers();

    this.state = {
      showUsers: true
    };
    this.handleMakeCsv = this.handleMakeCsv.bind(this);
    this.toggleTable = this.toggleTable.bind(this);
  }

  handleMakeCsv() {
    console.log('make csv');
  }

  toggleTable() {
    this.setState({
      showUsers: !this.state.showUsers
    });
  }

  render() {
    const { loading, loadingName } = this.props;
    if (loading || loadingName === 'fetch-users') return <Loading />;
    return (
      <>
        <div>
          <span>Show:&nbsp;</span>
          <span onClick={this.toggleTable} className={!this.state.showUsers ? 'link' : ''}>
            All Users
          </span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span onClick={this.toggleTable} className={this.state.showUsers ? 'link' : ''}>
            Scholarship Applicants
          </span>
        </div>
        {this.state.showUsers && <ReportUsersTable />}
        {!this.state.showUsers && <ReportApplicantTable />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  users: state.report.users,
  applicants: state.report.applicants
});

const mapDispatchToProps = {
  fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);

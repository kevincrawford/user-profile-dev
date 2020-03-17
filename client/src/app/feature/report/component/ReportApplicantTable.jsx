import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

export class ReportApplicantTable extends Component {
  handleName(applicant) {
    // console.log('handleName: applicant: ', applicant.user);
    if (!applicant || !applicant.user || !applicant.user.firstName) {
      if(!applicant || !applicant.user || !applicant.user.firstName) return <span>N/A</span>
      const names = applicant.user.displayName
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ');
      const firstName = names[0];
      const lastName = names.length > 1 ? names[names.length - 1] : '';
      return (
        <>
          <span>{firstName}</span> <span>{lastName}</span>
        </>
      );
    } else {
      return (
        <>
          <span>{applicant.user.firstName}</span> <span>{applicant.user.lastName}</span>
        </>
      );
    }
  }

  handleUserType(user) {
    if (!user.organization || user.organization.length < 1) {
      return <span>SPED</span>;
    } else {
      return <span>ADMIN</span>;
    }
  }

  renderApplicantRow(applicant) {
    // console.log('renderApplicantRow: applicant: ', applicant);
    if (!applicant || applicant === null || !applicant._id || !applicant.user) return <></>;
    return (
      <Table.Row key={applicant._id}>
        <Table.Cell>{this.handleName(applicant)}</Table.Cell>
        <Table.Cell>{applicant.user.email}</Table.Cell>
        <Table.Cell>{applicant.scholarshipName}</Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { applicants } = this.props;
    return (
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Scholarship</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {applicants && applicants.length > 0 && applicants.map(applicant => this.renderApplicantRow(applicant))}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  applicants: state.report.applicants
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportApplicantTable);

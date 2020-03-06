import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

export class ReportUsersTable extends Component {
  handleName(user) {
    if (!user.firstName) {
      const names = user.displayName
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
          <span>{user.firstName}</span> <span>{user.lastName}</span>
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

  render() {
    const { users } = this.props;
    return (
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>User Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users &&
            users.length > 0 &&
            users.map(user => (
              <Table.Row key={user._id}>
                <Table.Cell>{this.handleName(user)}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{this.handleUserType(user)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  users: state.report.users,
  applicants: state.report.applicants
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportUsersTable);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';

export class AdminLanding extends Component {
  render() {
    const { openModal } = this.props;
    return (
      <>
        <h1>
          Start Hiring. <em>Fast.</em>
        </h1>
        <List celled ordered>
          <List.Item>Sign Up</List.Item>
          <List.Item>Build Your Job Post</List.Item>
          <List.Item>Post Your Job</List.Item>
        </List>
        <Button color='green' content='Start Today!' onClick={() => openModal('RegisterModal', { postJobs: true })} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { openModal };

export default connect(mapStateToProps, mapDispatchToProps)(AdminLanding);

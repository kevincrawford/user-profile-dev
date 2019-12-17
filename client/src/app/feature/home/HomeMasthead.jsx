import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';

import { openModal } from '../../common/ui/modal/ModalActions';

const mapState = state => ({});

const actions = {
  openModal
};

export class HomeMasthead extends Component {
  render() {
    return (
      <Container>
        <h1>
          We empower SPEDucation
          <br />
          and connect people to solutions
          <br />
          that enable growth and discovery.
        </h1>
        <Button>For Educators</Button>
        <Button>For Students</Button>
        <Button>For Schools</Button>
      </Container>
    );
  }
}

export default connect(
  mapState,
  actions
)(HomeMasthead);

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
          The community for
          <br />
          Special Education Answers
          <br />
          Resources, and Jobs.
        </h1>
        <Button>For Educators</Button>
        <Button>For Students</Button>
        <Button>For Schools</Button>
        <Button>For Schools</Button>
      </Container>
    );
  }
}

export default connect(mapState, actions)(HomeMasthead);

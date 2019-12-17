import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlanCardFree from './PlanCardFree';

const mapState = state => ({});

const actions = {};

export class SelectPlan extends Component {
  render() {
    return <PlanCardFree />;
  }
}

export default connect(mapState, actions)(SelectPlan);

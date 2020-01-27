import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import './PricingPage.scss';

const mapState = state => ({});

const actions = {};

export class PricingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false
    };
  }

  render() {
    const togglePeriod = monthly => {
      this.setState({
        monthly: monthly
      });
    };

    return (
      <div className='pricing-page'>
        <div className='flex-box between sm'>
          <div>
            <Button.Group>
              <Button onClick={() => togglePeriod(false)} active={!this.state.monthly} positive={!this.state.monthly}>
                Pay Annually
              </Button>
              <Button onClick={() => togglePeriod(true)} active={this.state.monthly} positive={this.state.monthly}>
                Pay Monthly
              </Button>
            </Button.Group>
          </div>
          <div className='save'>
            <span>1 FREE Month</span> on Annual Plans
          </div>
        </div>
        <div className='flex-box between sm'>
          <div className='price-block'>
            <div className='school-size'>5,000</div>
            <div className='price-month'>5,000</div>
            <div className='price-annual'>5,000</div>
          </div>
          <div className='price-block'>m</div>
          <div className='price-block'>l</div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(PricingPage);

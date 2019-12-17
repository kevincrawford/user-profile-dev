import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import './plan.scss';

class PlanSelector extends Component {
  state = {
    price: 250,
    count: 0
  };

  handleSizeChange = (e, { name, value }) => {
    console.log('name, value: ', name, value);
    this.setState({ [name]: value });

    if (value > 50000) {
      this.setState({ price: 2001 });
    } else if (value > 25000) {
      this.setState({ price: 2000 });
    } else if (value > 10000) {
      this.setState({ price: 1000 });
    } else if (value > 1000) {
      this.setState({ price: 500 });
    } else {
      this.setState({ price: 250 });
    }
  };

  render() {
    const { price, count } = this.state;
    return (
      <div className='plan-selector'>
        <div className='price'>
          {price < 2001 && <div>${price}/mo</div>}
          {price > 2000 && <div>Call for Quote</div>}
        </div>
        <div className='benefits'>
          <div>School/District Size:</div>
          <h1>{count} Students</h1>
          <Form>
            <Form.Input min={0} max={55000} name='count' step={100} onChange={this.handleSizeChange} type='range' value={count} />
          </Form>
          <div className='sliderticks'>
            <p>0</p>
            <p></p>
            <p>10K</p>
            <p></p>
            <p></p>
            <p>25K</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p>50K</p>
            <p></p>
          </div>
          <div className='label'>Number of Students</div>
        </div>
      </div>
    );
  }
}

export default PlanSelector;

import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import PlanCardFree from './PlanCardFree';
import PlanComparison from './PlanComparison';

import './plan.scss';

class PlanSelector extends Component {
  state = {
    price: 500,
    count: 5000
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
    } else if (value > 2500) {
      this.setState({ price: 500 });
    } else {
      this.setState({ price: 250 });
    }
  };

  render() {
    const { price, count } = this.state;
    return (
      <>
        <PlanComparison />
        <hr className='my-5' />
        <PlanCardFree />
        <hr className='my-5' />
        <div className='plan-selector'>
          <div className='price'>
            {price < 2001 && <div>${price}/mo</div>}
            {price > 2000 && <div>Call for Quote</div>}
          </div>
          <div className='benefits'>
            <div className='pt-2'>School/District Size:</div>
            <h3 className='m-0'>{count} Students</h3>
            <Form>
              <Form.Input min={0} max={55000} name='count' step={500} onChange={this.handleSizeChange} type='range' value={count} />
            </Form>
            <div className='sliderticks'>
              <p>0</p>
              <p></p>
              <p>10K</p>
              <p></p>
              <p>20K</p>
              <p></p>
              <p>30K</p>
              <p></p>
              <p>40K</p>
              <p></p>
              <p>50K</p>
              <p></p>
            </div>
            <div className='label'>Number of Students</div>
          </div>
        </div>
      </>
    );
  }
}

export default PlanSelector;

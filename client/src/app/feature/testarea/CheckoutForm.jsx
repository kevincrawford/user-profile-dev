import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectStripe } from 'react-stripe-elements';
import { Button } from 'semantic-ui-react';
import { paySubscription } from '../account/accountActions';

import CardSection from './CardSection';

const productId = 'prod_GKqF8Nnx5z3WMI';

export class CheckoutForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();

    const cardElement = this.props.elements.getElement('card');

    try {
      const paymentMethod = await this.props.stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {name: 'Jenny Rosen'},
      })
      console.log('paymentMethod: ', paymentMethod)
  







      let { token } = await this.props.stripe.createToken({ name: 'Jenny Rosen' });
      console.log('token: ', token);
      await this.props.paySubscription(productId);
      console.log('done with subscription');
    } catch (error) {
      throw error;
    }
  };
  render() {
    return (
      <form className='form-container' autoComplete='off' onSubmit={this.handleSubmit}>
        <CardSection />
        <Button type='submit'>Confirm order</Button>
      </form>
    );
  }
}

const mapState = state => ({});

const actions = {
  paySubscription
};

export default injectStripe(connect(mapState, actions)(CheckoutForm));

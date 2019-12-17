import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const CheckoutStore = () => {
  return (
    <StripeProvider apiKey='pk_test_CV8IXpDrUJ6gpnkihh4GmNc000UYSihhiv'>
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default CheckoutStore;

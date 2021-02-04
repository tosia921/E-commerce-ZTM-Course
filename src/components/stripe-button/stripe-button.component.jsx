import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51IHFhKEibOMzNe9HHzk5HNXbkCETAvX5ZH4nBzNLw8yY3RlZmsw1PvJ5nCiKSV6aODjRUtQuh4EdLCSrUMNrhJan00K8mHTj42';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesfull')
    }

    return (
        <StripeCheckout
            label='Pay Now' 
            currency='GBP'
            name='Clothing Store'
            billingAddress
            shippingAddress
            description={`Your total is £${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;
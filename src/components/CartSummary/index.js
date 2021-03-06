import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'

const Summary = ({
  handleCheckout,
  display_price: {
    with_tax: { amount, currency, formatted },
  },
}) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong> {formatted}
      <StripeCheckout
        name="Gatsby Store"
        amount={amount}
        currency={currency || 'GBP'}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY || ''}
        shippingAddress={false}
        billingAddress
        zipCode
        token={handleCheckout}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="black" floated="right">
          Check out
        </Button>
      </StripeCheckout>
    </Segment>
  </div>
)

export default Summary
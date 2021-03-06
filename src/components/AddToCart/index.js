import React from 'react'
import { Icon, Transition, Button } from 'semantic-ui-react'
import CartContext from '../Context/CartContext'

import Moltin from '../../service/Moltin'

export default class AddToCart extends React.Component {
  state = {
    error: '',
    loading: false,
    quantity: 1,
    visible: false,
  }

  _handleSubmit = (e, context) => {
    const { productId } = this.props
    const { quantity } = this.state
    const cartId = localStorage.getItem('mcart')

    const error = this.validate(quantity)
    this.setState({ error })
    if (!error) {
      this.setState({
        loading: true,
      })

      Moltin.addToCart(cartId, productId, quantity)
        .then(() => {
          context.addToCart(quantity, cartId)

          this.setState(
            {
              loading: false,
              quantity: 1,
              visible: true,
            },
            this.toggleMessage()
          )
        })
        .catch(() =>
          this.setState({
            error: 'Something went wrong',
            loading: false,
          })
        )
    }
  }

  toggleMessage = () => {
    setTimeout(() => {
      this.setState({ visible: false })
    }, 1000)
  }

  _handleChange = ({ target: { value } }) => {
    this.setState({
      quantity: value,
    })
  }

  validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  render() {
    const { loading, quantity, visible, error } = this.state
    return (
      <CartContext.Consumer>
        {context => (
          <React.Fragment>
            <Button size="big" onClick={(e) => this._handleSubmit(e, context)}>Add To Cart</Button>
            {error && (
              <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
            )}
            <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
              <div style={{ color: 'green', position: 'absolute' }}>
                <Icon name="check" />
                Added to cart
              </div>
            </Transition>
          </React.Fragment>
        )}
      </CartContext.Consumer>
    )
  }
}

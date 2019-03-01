import 'regenerator-runtime/runtime'
import Moltin from '@moltin/sdk'
import axios from  'axios'
import newProduct from '../../store/newProduct'


const MoltinGateway = Moltin.gateway

export const createNewProduct = async () => {
  return await axios.post('/.netlify/functions/create-product', newProduct)
}

export const uploadProductImage = async (formData) => {
  return await axios.post('/.netlify/functions/create-product', {body:formData})
}


const getProducts = () => Moltin.Products.With('main_image').All()

const getProductById = id => Moltin.Products.With('main_image').Get(id)

const addToCart = (cartId, productId, quantity) =>
    Moltin.Cart(cartId).AddProduct(productId, quantity)

const getCartItems = id => Moltin.Cart(id).Items()

const removeFromCart = (productId, cartId) =>
    Moltin.Cart(cartId).RemoveItem(productId)

const checkoutCart = (cartId, customer, billing) =>
    Moltin.Cart(cartId).Checkout(customer, billing)

const payForOrder = (orderId, token, email) =>
    Moltin.Orders.Payment(orderId, {
      gateway: 'stripe',
      method: 'purchase',
      payment: token,
      options: {
        receipt_email: email,
      },
    })

const login = ({ email, password }) =>
    Moltin.Customers.Token(email, password).then(data => {
      const {
          data: { customer_id: id, token },
      } = data
      return {
        id,
        token,
      }
    })

const register = ({ email, password, ...rest }) =>
    Moltin.Customers.Create({
      email,
      password,
      type: 'customer',
      ...rest,
    }).then(data => {
      const {
          data: { name, id },
      } = data
      return login({ email, password }).then(data => {
        const { token } = data
        return {
          id,
          name,
          email,
          token,
        }
      })
    })

const getOrders = token => Moltin.Orders.With('items').All(token)








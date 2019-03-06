import 'regenerator-runtime/runtime'
import Moltin, { gateway as MoltinGateway } from '@moltin/sdk'
import axios from  'axios'
import newProduct from '../../store/newProduct'
import AWS from 'aws-sdk'
const FormData  = require("form-data")
const { createClient } = require('@moltin/request')
import shortid from 'shortid';

export const createNewProduct = async () => {
  return await axios.post('/.netlify/functions/create-product', newProduct)
}

export const uploadProductImage = async (file, productId, main = false) => {

    const CLOUD_NAME = 'dd3hsazbk'

    const formData = new FormData()
    let response = {}
    formData.append('file', file)
    formData.append('api_key', '323576721245618')
    formData.append('upload_preset','wtszlrdd')
    try {
      response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {headers: {"X-Requested-With": "XMLHttpRequest"}})
    } catch(error) {
      throw new Error('There was an error uploading your file.');
    }

    const url = response.data.url;

   return await linkImageUrlToProduct(url, productId, main)
}

const linkImageUrlToProduct = async (url, productId, main) => {
  let response = {}
  try {
    const body = {
      productId,
      url,
      main
    }
    response =  await axios.post('/.netlify/functions/create-product-image-from-url', body)
  } catch(error) {
    console.log(error)
    throw new Error('There was an processing your file.');
  }

  return response;
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








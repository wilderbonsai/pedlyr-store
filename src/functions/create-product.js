// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
const MoltinGateway = require('@moltin/sdk').gateway
const MemoryStorageFactory = require('@moltin/sdk').MemoryStorageFactory
const slugify = require('slugify')
const shortid = require('shortid');

const Moltin = MoltinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_SECRET_ID,
  storage: new MemoryStorageFactory()
})

exports.handler = async (event, context, callback) => {

  const newProduct = JSON.parse(event.body)

  const product = {
    name: newProduct.name,
    slug: slugify(newProduct.name.toLowerCase()),
    sku: shortid.generate(),
    description: newProduct.description,
    manage_stock: false,
    price: [
      {
        amount: newProduct.price,
        currency: 'EUR',
        includes_tax: true
      }
    ],
    status: 'live',
  }

  const createdProduct = await Moltin.Products.Create(product);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(createdProduct),
  });
};
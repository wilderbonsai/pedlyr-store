const MoltinGateway = require('@moltin/sdk').gateway
const MemoryStorageFactory = require('@moltin/sdk').MemoryStorageFactory
const slugify = require('slugify')
const shortid = require('shortid');

//TODO Set up environment building for env variables with functions
let client_id = 'ul3RvUZ3OK2niFsZ0KLFOGk4H25RZK2JaHJUHTxD5O'
let secret_id = 'Mvyr6hsaLm6RZJHIUtIDPzkn3WaRR6fcMQngXMF1lx'
if(process.env.MOLTIN_CLIENT_ID && process.env.MOLTIN_SECRET_ID) {
  client_id = process.env.MOLTIN_CLIENT_ID
  secret_id = process.env.MOLTIN_SECRET_ID
}
const Moltin = MoltinGateway({
  client_id: client_id,
  client_secret: secret_id,
  storage: new MemoryStorageFactory()
})


exports.handler = async (event, context, callback) => {
  const newProduct = JSON.parse(event.body)
  const uniqueId = shortid.generate()
  const product = {
    name: newProduct.name,
    slug: uniqueId,
    sku: uniqueId,
    description: newProduct.description,
    manage_stock: false,
    price: [
      {
        amount: newProduct.price*100,
        currency: 'USD',
        includes_tax: true
      }
    ],
    status: 'live',
    commodity_type: 'physical'
  }
  const createdProduct = await Moltin.Products.Create(product);
  //TODO Refactor to use Webpack env variables
  let brandId = process.env.MOLTIN_BRAND_ID
  if(!brandId) brandId = '15953afc-f247-4882-9967-57451ea60cb8'
  const brandIds = [
    brandId
  ]
  await Moltin.Products.UpdateRelationships(createdProduct.data.id, 'brand', brandIds)

  callback(null, {
    statusCode: 200,
    body: 'Success',
  });
};
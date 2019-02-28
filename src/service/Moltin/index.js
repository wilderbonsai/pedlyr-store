const MoltinGateway = require('@moltin/sdk').gateway

const Moltin = MoltinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID
})

const createProduct = async () => {
  const product = {
    name: 'Deck Shoe',
    slug: 'deck-shoe',
    sku: 'deck-shoe-001',
    description: 'A product for testing purposes',
    manage_stock: false,
    price: [
      {
        amount: 5891,
        currency: 'USD',
        includes_tax: true
      }
    ],
    status: 'live',
  }

  try {
    const product await Moltin.Products.Create(product);
  } catch(error) {

  }


}

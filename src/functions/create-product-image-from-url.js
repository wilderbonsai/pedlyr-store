const axios = require('axios')
const FormData = require('form-data')
const uri2buffer = require('data-uri-to-buffer')
const { createClient } = require('@moltin/request')
const MoltinGateway = require('@moltin/sdk').gateway

//TODO Set up environment building for env variables with functions
let client_id = 'ul3RvUZ3OK2niFsZ0KLFOGk4H25RZK2JaHJUHTxD5O'
let client_secret = 'Mvyr6hsaLm6RZJHIUtIDPzkn3WaRR6fcMQngXMF1lx'
if(process.env.MOLTIN_CLIENT_ID && process.env.MOLTIN_SECRET_ID) {
  client_id = process.env.MOLTIN_CLIENT_ID
  client_secret = process.env.MOLTIN_SECRET_ID
}

const moltin = new createClient({
  client_id: client_id,
  client_secret: client_secret
})



exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { url, main , productId } = body;

  const formData = await buildFormDataFromUrl(url)
  const image = createMoltinImage(formData)
  const link = createMoltinRelationship(image.id, productId)

  //TODO Delete Image from Cloudinary

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(moltinResponse.data),
  });

};

async function buildFormDataFromUrl(url) {

  let response = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  let fileName = lastURLSegment = pageURL.substr(url.lastIndexOf('/') + 1);
  const formData = new FormData()
  formData.append("file_name", fileName)
  formData.append("public", "true")
  formData.append("file", response.data, { filename: fileName })
  return formData;

}

async function createMoltinImage(formData) {

  const headers = {"Content-Type": formData.getHeaders()["content-type"]}
  let data = {
    body: formData
  }
  let moltinResponse = {}
  try {
    moltinResponse = await moltin.post("files", data, headers)
  } catch(error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  }
  return moltinResponse.data;
}

async function createMoltinRelationship(imageId, productId) {
  let linkResponse = {}
  try {
    if(main) {
      console.log('linking main')
      linkResponse = await linkMainProductImage(image.id, productId)
    } else {
      console.log('linking file')
      linkResponse = await linkProductImage(image.id, productId)
    }

  } catch(error) {
    console.log(error)
    callback(null, {
      statusCode: 400,
      body: 'error'
    });
    return;
  }
  return linkResponse.data
}
async function linkProductImage(imageId, productId) {
  //TODO Connect Image to Product

  const data = [{
      type: 'file',
      id: imageId
  }]
  return await moltin.post(`products/${productId}/relationships/files`, data )
}


async function linkMainProductImage(imageId, productId) {
  //TODO Connect Image to Product

  const data = {
    type:'main_image',
    id: imageId
  }
  console.log(imageId, productId, 'test')
  return await moltin.post(`products/${productId}/relationships/main-image`, data )
}


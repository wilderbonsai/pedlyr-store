const MoltinGateway = require('@moltin/sdk').gateway

const FormData = require("form-data")
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
})


exports.handler = async (event, context, callback) => {​
  const data = JSON.parse(event.body)
  let formData = data.formData

  const headers = {
    "Content-Type": formData.getHeaders()["content-type"]
  }
  ​
  formData.append("file_name", 'test.jpg')
  formData.append("public", "true")

  const data = {
    body: formData
  }
  ​
  Moltin
      .post("files", data, headers)
      .then(console.log(data))
      .error(console.error(error))
};
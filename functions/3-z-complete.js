require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('apptxw10CwB8Nl3Vo')
  .table('products')

exports.handler = async (event, context) => {
  // Show product
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`
      }
    }
  }

  // Show all products
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url
      return { id, name, url, price }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error'
    }
  }
}

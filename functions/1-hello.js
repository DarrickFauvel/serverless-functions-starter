// domain/.netlify/functions/1-hello
// exports
// const person = { name: 'John' }

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello World!'
  }
}

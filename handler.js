const { graphqlLambda } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');

const schema = require('./orion/schema');
const resolvers = require('./orion/resolvers');

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.query = (event, context, callback) => {
  function callbackFilter(error, output) {
    // output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = graphqlLambda({ schema: executableSchema });
  return handler(event, context, callbackFilter);
};

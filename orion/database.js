const dynamodb = require('serverless-dynamodb-client');

const docClient = dynamodb.doc;

function promisify(foo) {
  return new Promise((resolve, reject) => {
    foo((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports.wallets = () =>
  promisify(callback => docClient.scan({
    TableName: 'wallets',
  }, callback)).then(result => result.Items);

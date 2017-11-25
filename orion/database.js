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

module.exports.wallets = () => {
  return promisify(callback => docClient.scan({
    TableName: 'wallets',
  }, callback)).then((result) => {
    return result.Items;
  });
};

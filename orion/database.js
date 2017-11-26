const uuid = require('uuid/v4');
const validator = require('validator');
const dynamodb = require('serverless-dynamodb-client');

const docClient = dynamodb.doc;

function promisify(fn) {
  return new Promise((resolve, reject) => {
    fn((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Retrieves an item with the given ID from a DynamoDB table.
 * Returns a promise that is resolved with the result.
 *
 * @param string table table name
 * @param string id item ID
 * @return Promise
 */
function getItem(table, id) {
  return promisify(cb => docClient.get({
    TableName: table,
    Key: {
      id,
    },
  }, cb)).then(result => result.Item);
}

/**
 * Retrieves all items stored in a DynamoDB table.
 * Returns a promise that is resolved with an array of returned items.
 *
 * @param string table table name
 * @return Promise
 */
function listItems(table) {
  return promisify(cb => docClient.scan({
    TableName: table,
  }, cb)).then(result => result.Items);
}

/**
 * Stores an item to a DynamoDB table.
 * Returns a promise that is resolved with the newly created record.
 *
 * @param string table table name
 * @param object item item properties
 * @return Promise
*/
function putItem(table, item) {
  const data = Object.assign({}, item, { id: uuid() });

  return promisify(cb => docClient.put({
    TableName: table,
    Item: data,
  }, cb))
    .then(() => getItem(table, data.id));
}

module.exports.get = getItem;
module.exports.getAll = listItems;
module.exports.put = putItem;

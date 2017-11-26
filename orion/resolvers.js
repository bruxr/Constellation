const db = require('./database');

module.exports = {
  Query: {
    wallets: () => db.wallets(),
  },
};

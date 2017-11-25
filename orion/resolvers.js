const db = require('./database');

module.exports = {
  Query: {
    wallets: (root) => {
      return db.wallets();
    },
  },
};

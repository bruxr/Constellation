const db = require('./database');

module.exports = {
  Query: {
    wallets: () => db.wallets(),
  },
  Mutation: {
    createWallet(_, { name, balance }) {
      return db.wallets({ name, balance });
    },
  },
};

const escape = require('validator/lib/escape');

const db = require('./database');

module.exports = {
  Query: {
    wallets: () => db.getAll('wallets'),
  },
  Mutation: {
    createWallet(_, { name, balance }) {
      return db.put('wallets', {
        name: escape(name),
        balance,
      });
    },
  },
};

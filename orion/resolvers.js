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

const wallets = {
  get(args) {
    return [
      { id: 5, name: 'Unionbank', balance: 1000 },
      { id: 10, name: 'BDO', balance: 2000 },
    ];
  },
};

module.exports = {
  Query: {
    wallets: (root, args) => wallets.get(args),
  },
};

module.exports = `
type Location {
  lat: Float
  long: Float
}

enum TRANSACTION_TYPE {
  INCOME
  EXPENSE
  SET_BALANCE
}

type Transaction {
  id: ID!
  type: TRANSACTION_TYPE
  desc: String!
  created: Int!
  amount: Int!
  location: Location
  note: String
}

type Wallet {
  id: ID!
  name: String!
  balance: Int!
}

type Category {
  id: ID!
  name: String!
  color: String!
}

type Query {
  wallets: [Wallet]
}

type Mutation {
  createWallet(name: String!, balance: Int!): Wallet
}
`;


export const typeDefs = `
type Query {
   statistics: Statistic
  }

type Statistic {
  CountryServedMost : String
}


`
// type Subscription {
//   withdrawal(withdrawal: Withdrawal):String
// }

// input Withdrawal {
//   id: String
//   userName: String
//   password: String
//   coordinates: String
//   amount:Int
// }
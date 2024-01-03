
export const typeDefs = `
type Query {
   statistics: Statistic
  }

type Statistic {
  CountryServedMost: String
  CountryroundssMost: String
  CountryMissileFirst: String
  CountryMissileLast: String
  ListCountryes: String
  MostAffectedArea: String
  LeastAffectedArea: String
  avgByarea: [Arera]
}
type Arera {
  area:String
  avg: String
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
import { CountryServedMost, CountryRoundssMost, CountryMissileFirst, CountryMissileLast, ListCountryes, MostAffectedArea, LeastAffectedArea, avgByarea } from "./services";

export const resolvers = {
    Query:{
      async statistics() {
        try {
          return {
            CountryServedMost: await CountryServedMost(),
            CountryroundssMost: await CountryRoundssMost(),
            CountryMissileFirst: await CountryMissileFirst(),
            CountryMissileLast: await CountryMissileLast(),
            ListCountryes: await ListCountryes(),
            MostAffectedArea: await MostAffectedArea(),
            LeastAffectedArea: await LeastAffectedArea(),
            avgByarea: await avgByarea(),
          }
        }
        catch (error) {
          throw error
        }
      },
    },
  };
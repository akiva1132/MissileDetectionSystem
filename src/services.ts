import { client } from "./configurations/redis"
import { Data } from "./configurations/types";



export const CountryServedMost = async () => {
    const countryes = await client.scan(0)
    const result:any = {}
    for (let key of countryes.keys) {
        const dataFromRedis = await client.json.get(key) as unknown as Data;
        const country = key.split('-')[0]
        if (result[country] !== undefined) {
            result[country] += dataFromRedis.missileAmount
        }
        else {
            result[country] = dataFromRedis.missileAmount
        }
    }
    const maxKey =Object.keys(result).reduce((max, key) => result[key] > result[max] ? key : max, Object.keys(result)[0])
    console.log('Key with max missiles:', maxKey)
    return 'Key with max missiles: ' + maxKey
}


export const CountryServedMost2 = async () => {
    const countryes = await client.scan(0)
    const result:any = {}
    for (let key of countryes.keys) {
        const dataFromRedis = await client.json.get(key) as unknown as Data;
        const country = key.split('-')[0]
        if (result[country] !== undefined) {
            result[country] += dataFromRedis.rounds
        }
        else {
            result[country] = dataFromRedis.rounds
        }
    }
    const maxKey =Object.keys(result).reduce((max, key) => result[key] > result[max] ? key : max, Object.keys(result)[0])
    console.log('Key with max missiles:', maxKey)
    return 'Key with max missiles: ' + maxKey
}

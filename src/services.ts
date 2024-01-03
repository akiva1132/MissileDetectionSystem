import { AggregateGroupByReducers, AggregateSteps } from "redis";
import { client } from "./configurations/redis"
import { Data } from "./configurations/types";



export const CountryServedMost = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@country",
                REDUCE: {
                    AS: "max",
                    property: "@missileAmount",
                    type: AggregateGroupByReducers.SUM,
                },
            },
            {
                type: AggregateSteps.SORTBY,
                BY: "@max",
            },
        ],
    });
    return `country is ${data.results[data.results.length - 1].country} with ${data.results[data.results.length - 1].max}`
}


export const CountryRoundssMost = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@country",
                REDUCE: {
                    AS: "max",
                    property: "@rounds",
                    type: AggregateGroupByReducers.SUM,
                },
            },
            {
                type: AggregateSteps.SORTBY,
                BY: "@max",
            },
        ],
    });
    return `country is ${data.results[data.results.length - 1].country} with ${data.results[data.results.length - 1].max}`
}

export const CountryMissileFirst = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@country",

                REDUCE: {
                    AS: "max",
                    property: "@creationTime",
                    type: AggregateGroupByReducers.SUM,
                },
            },
            {
                type: AggregateSteps.SORTBY,
                BY: "@max",
            },
        ],
    });

    const date = new Date(Number(data.results[0].max))
    return `country is ${data.results[0].country} with ${date}`
}

export const CountryMissileLast = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@country",

                REDUCE: {
                    AS: "max",
                    property: "@lastUpdateTime",
                    type: AggregateGroupByReducers.SUM,
                },
            },
            {
                type: AggregateSteps.SORTBY,
                BY: "@max",
            },
        ],
    });

    const date = new Date(Number(data.results[data.results.length - 1].max))
    return `country is ${data.results[data.results.length - 1].country} with ${date}`
}

export const ListCountryes = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@country",

                REDUCE: {
                    AS: "max",
                    property: "@lastUpdateTime",
                    type: AggregateGroupByReducers.SUM,
                },
            }
        ],
    });
    const result = data.results.map(feild => feild.country)
    return `countryes are ${result}`
}

export const MostAffectedArea = async () => {
    const data = await client.keys('*');
    const areas = data.map(key => key.split(':')[2]).filter(area => area !== undefined);

    const counts: any = {};
    let mostCommonArea;
    let maxCount = 0;

    areas.forEach((area: string) => {
        counts[area] = (counts[area] || 0) + 1;

        if (counts[area] > maxCount) {
            maxCount = counts[area];
            mostCommonArea = area;
        }
    });
    return `countryes is ${mostCommonArea}`
}

export const LeastAffectedArea = async () => {
    const data = await client.keys('*');
    const areas = data.map(key => key.split(':')[2]).filter(area => area !== undefined);

    const counts: any = {};
    let leastAffectedArea;
    let minCount = Infinity;

    areas.forEach((area: string) => {
        counts[area] = (counts[area] || 0) + 1;

        if (counts[area] < minCount) {
            minCount = counts[area];
            leastAffectedArea = area;
        }
    });

    return `The least affected area is ${leastAffectedArea}`;
};

export const avgByarea = async () => {
    const data = await client.ft.aggregate("idx:countryes-test3", "*", {
        STEPS: [
            {
                type: AggregateSteps.GROUPBY,
                properties: "@area",
                REDUCE: {
                    AS: "avg",
                    property: "@missileAmount",
                    type: AggregateGroupByReducers.AVG,
                },
            },
            {
                type: AggregateSteps.SORTBY,
                BY: "@avg",
            },
        ],
    });
    console.log(data);
    
    return data.results
}
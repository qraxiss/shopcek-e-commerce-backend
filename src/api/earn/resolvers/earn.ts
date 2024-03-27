import { claim, getLastClaim, getStreak,startSessionTime } from './claim'
import { Strapi } from '@strapi/strapi'

const typeDefs = `
    type Query {
        lastClaim(service: String!): JSON
        streak(service: String!): JSON
    }

    type Mutation {
        claim(service: String!): JSON
        startSessionTime: JSON
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            streak: {
                resolve: getStreak
            },
            lastClaim: {
                resolve: getLastClaim
            }
        },
        Mutation: {
            claim: {
                resolve: claim
            },
            startSessionTime: {
                resolve: startSessionTime
            }
        }
    }
})

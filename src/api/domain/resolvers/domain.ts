import { Strapi } from '@strapi/strapi'
import { buyDomain } from './buy-domain'
import { checkDomain } from './check-domain'
const typeDefs = `
    type Query {
        checkDomain(username:String!): Boolean!
    }

    type Mutation {
        buyDomain(username: String!): Boolean!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            checkDomain: {
                resolve: checkDomain
            }
        },
        Mutation: {
            buyDomain: {
                resolve: buyDomain
            }
        }
    }
})

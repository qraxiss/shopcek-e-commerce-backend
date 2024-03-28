import { Strapi } from '@strapi/strapi'
import { buyDomain } from './buy-domain'
import { checkDomain } from './check-domain'
import { domains } from './domains'
const typeDefs = `
    type Query {
        checkDomain(username:String!): Boolean!
        userDomains: [Domain]
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
            },
            userDomains: {
                resolve: domains
            }

        },
        Mutation: {
            buyDomain: {
                resolve: buyDomain
            }
        }
    }
})

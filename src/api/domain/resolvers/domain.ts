import { Strapi } from '@strapi/strapi'
import { buyDomain } from './buy-domain'
import { checkDomain } from './check-domain'
import { domains } from './domains'
import { choose, choosen } from './choose'
const typeDefs = `
    type Query {
        checkDomain(username:String!): Boolean!
        userDomains: [Domain]
        choosen: Domain
    }

    type Mutation {
        buyDomain(username: String!, transaction: String!): Boolean!
        chooseDomain(username: String!): JSON
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
            },
            choosen: {
                resolve: choosen
            }
        },
        Mutation: {
            buyDomain: {
                resolve: buyDomain
            },
            chooseDomain: {
                resolve: choose
            }
        }
    }
})

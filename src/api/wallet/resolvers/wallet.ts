import { Strapi } from '@strapi/strapi'
import { generateNonce } from 'siwe'
import verify from './verify'

const typeDefs = `
    type Query {
        nonce: String!
    }

    type Mutation {
        verify(address: String!, signature: String!, message: String!): String!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            nonce: {
                resolve: generateNonce
            }
        },
        Mutation: {
            verify: {
                resolve: verify
            }
        }
    },
    resolversConfig: {
        'Query.nonce': {
            auth: false
        },
        'Mutation.verify': {
            auth: false
        }
    }
})

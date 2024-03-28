import { Strapi } from '@strapi/strapi'

import { userWishlist, removeFromWishlist, addToWishlist } from './resolvers'

const typeDefs = `

    type Mutation {
        addToWishlist(slug: String!): JSON
        removeFromWishlist(slug: String!): JSON
    }

    type Query {
        userWishlist: JSON
    }

`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Mutation: {
            addToWishlist: {
                resolve: addToWishlist
            },
            removeFromWishlist: {
                resolve: removeFromWishlist
            }
        },
        Query: {
            userWishlist: {
                resolve: userWishlist
            }
        }
    }
})

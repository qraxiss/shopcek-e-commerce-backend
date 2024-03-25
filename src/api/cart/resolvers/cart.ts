import { Strapi } from '@strapi/strapi'
import { getCart } from './get-cart'
import { getCartId } from './cart-id'

import { operations } from './operations'

export const typeDefs = `
    type CartOperation {
        id: ID
        status: Boolean!
    }

    type Mutation {
        cart(operation:String!, cartId: ID, input:JSON): CartOperation!
    }

    type Query {
        cart(id: ID): Cart!
    }

    extend type Cart {
        id: ID!
    }

    type Query {
        cartId: ID!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            cart: {
                resolve: getCart
            },
            cartId: {
                resolve: getCartId
            }
        },
        Mutation: {
            cart: {
                resolve: operations
            }
        }
    },
    resolversConfig: {
        'Query.cart': {
            auth: false
        },
        'Query.cartId': {
            auth: false
        },
        'Mutation.cart': {
            auth: false
        }
    }
})

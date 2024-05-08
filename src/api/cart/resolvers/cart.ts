import { Strapi } from '@strapi/strapi'
import { getCart } from './get-cart'
import { getCartId } from './cart-id'

import { operations, addItem, updateItem, emptyCart, deleteItem } from './operations'

//cart(operation:String!, input:JSON): CartOperation!
export const typeDefs = `
    type CartOperation {
        id: ID
        status: Boolean!
    }

    type Mutation {
        addItemToCart(variantId: ID!, count: Int = 1): CartOperation!
        emptyCart: CartOperation!
        deleteCartItem(itemId: ID!): CartOperation!
        updateCartItem(itemId: ID!, count: Int!): CartOperation!
    }

    type Query {
        cart: Cart!
    }

    extend type Cart {
        id: ID!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            cart: {
                resolve: getCart
            }
        },
        Mutation: {
            addItemToCart: {
                resolve: addItem
            },
            deleteCartItem: {
                resolve: deleteItem
            },
            emptyCart: {
                resolve: emptyCart
            },
            updateCartItem: {
                resolve: updateItem
            }
        }
    }
    // resolversConfig: {
    //     'Query.cart': {
    //         auth: false
    //     },
    //     'Query.cartId': {
    //         auth: false
    //     },
    //     'Mutation.cart': {
    //         auth: false
    //     }
    // }
})

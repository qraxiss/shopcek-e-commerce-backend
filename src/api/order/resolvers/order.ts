import { GraphQLError } from 'graphql'
import { Strapi } from '@strapi/strapi'

export async function getOrders(obj, args, context) {
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            orders: '*'
        }
    })

    const orders = await strapi.entityService.findMany('api::order.order', {
        filters: {
            id: {
                $in: user.orders.map((order) => order.id)
            }
        },
        populate: {
            printful_order: true,
            cart: true
        }
    })

    return orders.map((order) => ({
        id: order.id,
        count: order.cart.count,
        price: order.cart.price,
        createdAt: order.createdAt,
        error: order.printful_order.error
    }))
}

export async function placeOrder(obj, { transaction, shipping }, context) {
    const result = await strapi.service('api::order.order').placePrintfulOrder({
        transaction,
        shipping
    })

    if (result.error) {
        throw new GraphQLError(result.error)
    }

    return result.order.id
}

export const typeDefs = `
    type Mutation {
        placeOrder(transaction:String!, shipping: String, recepient: JSON): JSON!   
    }

    type UserOrder {
        count: Int!
        price: Float!
        id: ID!
        createdAt: String!
        error: String
    }

    type Query {
        userOrders: [UserOrder]!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            userOrders: {
                resolve: getOrders
            }
        },
        Mutation: {
            placeOrder: placeOrder
        }
    }
})

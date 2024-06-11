import { Strapi } from '@strapi/strapi'
import { getOrders } from './user-orders'
import { placeOrder } from './place-order'
export const typeDefs = `
    type Mutation {
        placeOrder(transaction:String!, shipping: String = "STANDART", recepient: JSON): JSON!   
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

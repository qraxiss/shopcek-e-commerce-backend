import {Strapi} from '@strapi/strapi'
import { placeOrder } from './place-order'
export const typeDefs = `
    type Mutation {
        placeOrder(transaction:String!, recepient: JSON): JSON!
    }
`

export default ({strapi}: {strapi: Strapi})=>({
    typeDefs,
    resolvers: {
        Mutation: {
            placeOrder: placeOrder
        }
    }
})
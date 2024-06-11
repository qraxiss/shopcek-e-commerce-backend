import { GraphQLError } from 'graphql'

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

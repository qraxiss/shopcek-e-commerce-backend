import { GraphQLError } from 'graphql'

export async function placeOrder(obj, { transaction }, context) {
    const result = await strapi.service('api::order.order').placePrintfulOrder({
        transaction
    })

    if (result.error) {
        throw new GraphQLError(result.error)
    }

    return result.order.id
}

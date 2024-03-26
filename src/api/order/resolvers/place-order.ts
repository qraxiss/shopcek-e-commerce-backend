import {GraphQLError} from 'graphql'

export async function placeOrder(obj, {transaction, recipient}, context){
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            recipient: "*"
        }
    })


    const result = await strapi.service('api::order.order').placePrintfulOrder({
        recipientId: user.recipient.id,
        transaction
    })

    if (result.error){
        throw new GraphQLError(result.error)
    }

    return result.order.id

}
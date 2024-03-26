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

    return result

}
import { GraphQLError } from 'graphql'

export async function getCartId(obj, args, context) {
    const user = strapi.requestContext.get().state.user

    if (user) {
        return (
            await strapi.db.query('plugin::users-permissions.user').findOne({
                where: {
                    id: user.id
                },
                populate: {
                    cart: '*'
                }
            })
        ).cart.id
    }

    return (
        await strapi.entityService.create('api::cart.cart', {
            data: {}
        })
    ).id
}

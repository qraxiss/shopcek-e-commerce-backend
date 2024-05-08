import { GraphQLError } from 'graphql'

export async function getCart(obj, args, context) {
    if (!context.state.user) {
        throw new GraphQLError('User have no cart!')
    }

    return await userCart({ context })
}

export async function userCart({ context }) {
    return await strapi.db.query('api::cart.cart').findOne({
        where: {
            user: context.state.user.id
        }
    })
}

export async function publicCart({ id }) {
    const cart = await strapi.entityService.findOne('api::cart.cart', id, {
        populate: {
            user: true
        }
    })

    if (cart.user) {
        throw new GraphQLError('You cant access without login this cart!')
    }

    delete cart.user

    return cart
}

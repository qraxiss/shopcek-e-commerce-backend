import { GraphQLError } from 'graphql'
type operation = 'delete' | 'add' | 'update' | 'empty'

export async function operations(obj, { operation, input }: { operation: operation; cartId?: number; input?: any }, context) {
    if (!input && operation !== 'empty') {
        throw new GraphQLError('input must be defined')
    }

    if (!strapi.requestContext.get().state.user) {
        throw new GraphQLError('Must be logged or define a cartId')
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            cart: '*'
        }
    })

    if (!user.cart) {
        throw new GraphQLError('User have no cart!')
    }

    const cartId = user.cart.id

    // switch (operation) {
    //     case 'empty': {
    //         return await empty({ cartId })
    //     }
    //     case 'update': {
    //         return await update({ cartId, ...input })
    //     }
    //     case 'add': {
    //         return await add({ cartId, ...input })
    //     }
    //     case 'delete': {
    //         return await deleteItem({ cartId, ...input })
    //     }
    // }
}

async function getCartId(context) {
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            cart: '*'
        }
    })

    if (!user.cart) {
        throw new GraphQLError('User have no cart!')
    }

    return user.cart.id
}

export async function updateItem(obj, { itemId, count }, context) {
    return await strapi.service('api::cart.cart').updateCount({ itemId, count, cartId: await getCartId(context) })
}

export async function emptyCart(obj, args, context) {
    return await strapi.service('api::cart.cart').emptyCart({ cartId: await getCartId(context) })
}

export async function deleteItem(obj, { itemId }, context) {
    return await strapi.service('api::cart.cart').deleteItem({ itemId, cartId: await getCartId(context) })
}

export async function addItem(obj, { variantId, count }, context) {
    return await strapi.service('api::cart.cart').addItem({ cartId: await getCartId(context), variantId, count })
}

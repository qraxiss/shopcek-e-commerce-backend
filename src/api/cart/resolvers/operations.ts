import { GraphQLError } from 'graphql'
type operation = 'delete' | 'add' | 'update' | 'empty'

export async function operations(obj, { operation, cartId, input }: { operation: string; cartId?: number; input?: any }, context) {
    if (!input && operation !== 'empty') {
        throw new GraphQLError('input must be defined')
    }

    let user = strapi.requestContext.get().state.user

    if (!user && !cartId) {
        throw new GraphQLError('Must be logged or define a cartId')
    }

    if (user) {
        user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: user.id
            },
            populate: {
                cart: '*'
            }
        })
        cartId = user.cart.id
    }

    if (!user && cartId){
        const cart = await strapi.entityService.findOne('api::cart.cart', cartId, {
            populate: {
                user:true
            }
        })

        if (!cart){
            throw new GraphQLError('Cart not found!')
        }

        if (cart.user){
            throw new GraphQLError('You cant access this cart!')
        }
    }

    switch (operation) {
        case 'empty': {
            return await empty({ cartId })
        }
        case 'update': {
            return await update(input)
        }
        case 'add': {
            return await add({ cartId, ...input })
        }
        case 'delete': {
            return await deleteItem(input)
        }
    }
}

async function update({ itemId, count }) {
    return await strapi.service('api::cart.cart').updateCount({ itemId, count })
}

async function empty({ cartId }) {
    return await strapi.service('api::cart.cart').emptyCart({ cartId })
}

async function deleteItem({ itemId }) {
    return await strapi.service('api::cart.cart').deleteItem({ itemId })
}

async function add({ cartId, variantId }) {
    return await strapi.service('api::cart.cart').addItem({ cartId, variantId })
}

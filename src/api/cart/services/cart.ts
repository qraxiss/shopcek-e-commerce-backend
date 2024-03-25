/**
 * cart service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async addItem({ cartId, variantId, count }: { cartId: number; variantId: number; count: number }) {
            const item = await strapi.service('api::item.item').createSync({cartId, variantId, count})

            return {
                status: !!item,
                id: item.id
            }
        },

        async deleteItem({ itemId }: { itemId: number }) {
            const result = await strapi.service('api::item.item').deleteSync({id: itemId})
            return {
                status: !!result
            }
        },

        async emptyCart({ cartId }: { cartId: number }) {
            const cart = await strapi.entityService.findOne('api::cart.cart', cartId, {
                populate: {
                    items: true
                }
            })

            if (cart.items.length === 0) {
                throw new Error('Cart is Empty')
            }

            const items = cart.items.map((item) => {
                return item.id
            })

            const result = await strapi.db.query('api::item.item').deleteMany({
                filters: {
                    items: {
                        $in: items
                    }
                }
            })

            return {
                status: !!result
            }
        },

        async updateCount({ itemId, count, cartId }: { itemId: number; count: number; cartId: number }) {
            let result
            if (count <= 0) {
                strapi.service('api::cart.cart').deleteItem({ itemId, cartId })
            }

            result = await strapi.service('api::item.item').updateSync({
                id: itemId,
                count
            })

            return {
                status: !!result
            }
        }
    }
}

export default factories.createCoreService('api::cart.cart', services)

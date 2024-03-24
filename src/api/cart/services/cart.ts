/**
 * cart service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async addItem({ cartId, variantId }: { cartId: number; variantId: number }) {
            const item = await strapi.entityService.create('api::item.item', {
                data: {
                    variant: variantId
                }
            })

            await strapi.entityService.update('api::cart.cart', cartId, {
                data: {
                    items: {
                        connect: [item.id]
                    }
                },
                populate: {
                    items: true
                }
            })

            return item.id
        },

        async deleteItem({ itemId }: { cartId: number; itemId: number }) {
            return await strapi.entityService.delete('api::item.item', itemId)
        },

        async emptyCart({ cartId }: { cartId: number }) {
            const cart = await strapi.entityService.findOne('api::cart.cart', cartId, {
                populate: {
                    items: true
                }
            })

            const items = cart.items.map((item) => {
                return item.id
            })

            return await strapi.db.query('api::item.item').deleteMany({
                filters: {
                    items: {
                        $in: items
                    }
                }
            })
        },

        async updateCount({ itemId, count }: { itemId: number; count: number }) {
            return await strapi.entityService.update('api::item.item', itemId, {
                data: {
                    count
                }
            })
        }
    }
}

export default factories.createCoreService('api::cart.cart', services)

/**
 * cart service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    // const service = strapi.service('api::cart.cart')

    return {
        async addItem({ variantId }: { variantId: number }) {
            const item = await strapi.entityService.create('api::item.item', {
                data: {
                    variant: variantId
                }
            })

            await strapi.db.query('api::cart.cart').update({
                where: {
                    user: strapi.requestContext.get().state.user.id
                },
                data: {
                    items: [item.id]
                },
                populate: {
                    items: '*'
                }
            })

            return item.id
        },

        async deleteItem({ itemId }: { itemId: number }) {
            return await strapi.entityService.delete('api::item.item', itemId)
        },

        async emptyCart() {
            const cart = await strapi.db.query('api::cart.cart').findOne({
                where: {
                    user: strapi.requestContext.get().state.user.id
                },
                populate: {
                    items: ['id']
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

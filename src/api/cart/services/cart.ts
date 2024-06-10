/**
 * cart service
 */

import { factories, Strapi } from '@strapi/strapi'
import { shippingRates, getVariant } from '../../../helpers/printful'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async addItem({ cartId, variantId, count }: { cartId: number; variantId: number; count: number }) {
            const item = await strapi.service('api::item.item').createSync({ cartId, variantId, count })

            return {
                status: !!item,
                id: item.id
            }
        },

        async deleteItem({ itemId }: { itemId: number }) {
            const result = await strapi.service('api::item.item').deleteSync({ id: itemId })
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
        },

        async userCart({ userId }) {
            return await strapi.db.query('api::cart.cart').findOne({
                where: {
                    user: userId
                },
                populate: {
                    items: {
                        populate: {
                            variant: '*'
                        }
                    }
                }
            })
        },

        async shippingRates({ userId }) {
            const recipient = await strapi.service('api::recipient.recipient').getActiveRecipient({ userId })
            if (!recipient) {
                throw new Error('You have to select recipient!')
            }
            const cart = await strapi.service('api::cart.cart').userCart({ userId })
            const items = await Promise.all(
                cart.items.map(async (item) => {
                    return {
                        quantity: item.count,
                        ...(await getVariant({ printful_id: item.variant.printful_id }))
                    }
                })
            )

            try {
                return await shippingRates({ recipient, items })
            } catch (error: any) {
                if (error.response) {
                    return error.response.data // => the response payload
                }
            }
        }
    }
}

export default factories.createCoreService('api::cart.cart', services)

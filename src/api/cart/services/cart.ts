/**
 * cart service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async addItem({ cartId, variantId, count }: { cartId: number; variantId: number; count: number }) {
            const cart = await strapi.entityService.findOne('api::cart.cart', cartId, {
                populate: {
                    items: {
                        populate: {
                            variant: true
                        }
                    }
                }
            })

            let item

            // if item already created
            item = cart.items.find((item) => {
                return item.variant.id === Number(variantId)
            })

            if (item) {
                const result = await strapi.db.query('api::item.item').update({
                    where: {
                        id: item.id
                    },
                    data: {
                        count: count + item.count
                    }
                })

                return {
                    status: !!result,
                    id: item.id
                }
            }

            item = await strapi.entityService.create('api::item.item', {
                data: {
                    variant: variantId
                }
            })

            await strapi.entityService.update('api::cart.cart', cartId, {
                data: {
                    items: {
                        connect: [item.id]
                    },
                    count: cart.count + 1
                },
                populate: {
                    items: true
                }
            })

            return {
                status: !!item,
                id: item.id
            }
        },

        async deleteItem({ itemId, cartId }: { cartId: number; itemId: number }) {
            const result = await strapi.entityService.delete('api::item.item', itemId)
            const cart = await strapi.entityService.findOne('api::cart.cart', cartId)
            await strapi.entityService.update('api::cart.cart', cartId, {
                data: {
                    count: cart.count - 1
                }
            })
            
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

        async updateCount({ itemId, count }: { itemId: number; count: number }) {
            let result
            if (count<=0){
                strapi.service('api::cart.cart').deleteItem({ itemId })
            }
            
            result = await strapi.entityService.update('api::item.item', itemId, {
                data: {
                    count
                }
            })

            return {
                status: result ? result.count === count : false
            }
        }
    }
}

export default factories.createCoreService('api::cart.cart', services)

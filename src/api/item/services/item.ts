/**
 * item service
 */

import { factories, Strapi } from '@strapi/strapi'
import variant from '../../variant/controllers/variant'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::item.item'

    return {
        async deleteSync({ id }) {
            const item = await strapi.entityService.findOne(service, id, {
                populate: {
                    carts: true
                }
            })

            item.carts.map((cart) => {
                strapi.entityService.update('api::cart.cart', cart.id, {
                    data: {
                        price: cart.price - item.totalPrice,
                        count: cart.count - 1
                    }
                })
            })

            return await strapi.entityService.delete(service, id)
        },

        async createSync({ variantId, cartId, count }) {
            const cart = await strapi.entityService.findOne('api::cart.cart', cartId, {
                populate: {
                    items: {
                        populate: {
                            variant: true
                        }
                    }
                }
            })

            const item = cart.items.find((item) => {
                return item.variant.id === Number(variantId)
            })

            if (item) {
                const total = item.count + count
                return await strapi.service('api::item.item').updateSync({ id: item.id, count: total })
            }

            const variant = await strapi.entityService.findOne('api::variant.variant', variantId)
            const itemPrice = variant.price * count

            await strapi.entityService.update('api::cart.cart', cartId, {
                data: {
                    count: cart.count + 1,
                    price: cart.price + itemPrice
                }
            })

            return await strapi.entityService.create(service, {
                data: {
                    variant: variantId,
                    count,
                    carts: [cartId],
                    totalPrice: itemPrice
                }
            })
        },

        async updateSync({ id, count }) {
            if (count <= 0) {
                return await strapi.service(service).deleteSync({ id })
            }

            const item = await strapi.entityService.findOne(service, id, {
                populate: {
                    carts: {
                        populate: {
                            items: {
                                populate: {
                                    variant: true
                                }
                            }
                        }
                    },
                    variant: true
                }
            })

            const itemPrice = item.variant.price * count
            const updatedItem = await strapi.entityService.update(service, id, {
                data: {
                    totalPrice: itemPrice,
                    count
                }
            })

            await Promise.all(
                item.carts.map(async (cart) => {
                    const count = cart.items.length
                    let price = 0
                    cart.items.forEach((item) => {
                        if (item.id === updatedItem.id) {
                            price = price + itemPrice
                        } else {
                            price = price + item.variant.price * item.count
                        }
                    })

                    return await strapi.entityService.update('api::cart.cart', cart.id, {
                        data: {
                            price,
                            count
                        }
                    })
                })
            )

            return updatedItem
        }
    }
}

export default factories.createCoreService('api::item.item', services)

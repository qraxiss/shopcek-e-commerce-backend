/**
 * order service
 */

import { factories, Strapi } from '@strapi/strapi'
import { newOrderPrintful, getVariant } from '../../../helpers/printful'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async placeOrder({ transaction }: { transaction: string }) {
            const userId = strapi.requestContext.get().state.user.id

            console.log(userId)

            const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                where: {
                    id: userId
                },
                populate: {
                    cart: true
                }
            })

            const recipient = await strapi.service('api::recipient.recipient').getActiveRecipient({ userId })

            if (!recipient) {
                throw Error('You dont have selected address!')
            }

            const order = await strapi.entityService.create('api::order.order', {
                data: {
                    transaction,
                    user: user.id,
                    cart: user.cart.id,
                    recipient: recipient.id
                },
                populate: {
                    recipient: true,
                    cart: {
                        populate: {
                            items: {
                                populate: {
                                    variant: true
                                }
                            }
                        }
                    }
                }
            })

            const cart = await strapi.entityService.create('api::cart.cart', {
                data: {
                    user: user.id
                }
            })

            return order
        },

        async placePrintfulOrder({ transaction }: { transaction: string }) {
            const order = await strapi.service('api::order.order').placeOrder({ transaction })
            const items = await Promise.all(
                order.cart.items.map(async (item) => {
                    return await getVariant({ printful_id: item.variant.printful_id })
                })
            )

            let printful
            try {
                printful = await newOrderPrintful({ items, recipient: order.recipient })
            } catch (e: any) {
                printful = { error: e.response.data.result }
            }

            return await strapi.entityService.create('api::printful-order.printful-order', {
                data: {
                    order: order.id,
                    ...printful
                },
                populate: {
                    order: true
                }
            })
        }
    }
}

export default factories.createCoreService('api::order.order', services)

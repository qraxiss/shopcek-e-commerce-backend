/**
 * order service
 */

import { factories, Strapi } from '@strapi/strapi'
import { newOrderPrintful, getVariant } from '../../../helpers/printful'
import recipient from './recipient'

const order = ({ strapi }: { strapi: Strapi }) => ({
    async placeOrder({ transaction }: { transaction: string }) {
        const userId = strapi.requestContext.get().state.user.id

        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: userId
            },
            populate: {
                cart: true
            }
        })

        const recipient = await strapi.service('api::order.recipient').getActiveRecipient({ userId })

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

    async placePrintfulOrder({ transaction, shipping }: { transaction: string; shipping: string }) {
        const order = await strapi.service('api::order.order').placeOrder({ transaction })
        const items = await Promise.all(
            order.cart.items.map(async (item) => {
                return {
                    quantity: item.count,
                    ...(await getVariant({ printful_id: item.variant.printful_id }))
                }
            })
        )

        let printful
        try {
            printful = await newOrderPrintful({ items, recipient: order.recipient, shipping })
        } catch (e: any) {
            printful = { error: e.response.data.result }
        }

        return await strapi.entityService.create('api::printful.printful-order', {
            data: {
                order: order.id,
                ...printful
            },
            populate: {
                order: true
            }
        })
    }
})

export default ({ strapi }: { strapi: Strapi }) => ({
    recipient: recipient({ strapi }),
    order: order({ strapi })
})

// export default factories.createCoreService('api::order.order', services)

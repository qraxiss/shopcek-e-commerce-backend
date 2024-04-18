/**
 * variant service
 */

import { factories, Strapi } from '@strapi/strapi'

import { cartesian } from '../../../helpers/math'

function services({ strapi: Strapi }) {
    return {
        async createVariants({ product, sizes, colors }: { product: number; sizes: number[]; colors: number[] }) {
            const combinations = cartesian(sizes, colors)
            const variants = combinations.map((combination) => {
                return {
                    product,
                    size: combination[0],
                    color: combination[1]
                }
            })

            return await Promise.all(
                variants.map(async (variant) => {
                    return await strapi.entityService.create('api::variant.variant', {
                        data: variant,
                        populate: {
                            size: '*',
                            color: '*'
                        } as any
                    })
                })
            )
        },

        async createPrintfulVariants({ product, sizes, colors, variants }) {
            const localVariants = await Promise.all(
                variants.map(async (variant) => {
                    const size = sizes.find((size) => {
                        return size.value == variant.size
                    })
                    const color = colors.find((color) => {
                        return color.value == variant.color
                    })


                    try {
                        const localVariant = await strapi.entityService.create('api::variant.variant', {
                            data: {
                                ...variant,
                                product,
                                size: size.id,
                                color: color.id
                            },
                            populate: {
                                size: '*',
                                color: '*'
                            } as any
                        })
                        // console.log('variant', variant.color, variant.size, variant.printful_id, 'created')

                        return localVariant
                    } catch (e) {
                        console.log('variant', variant.color, '(', color.value, color.hex, color.id, ')', variant.printful_id )
                    }
                })
            )

            return localVariants
        }
    }
}

export default factories.createCoreService('api::variant.variant', services)

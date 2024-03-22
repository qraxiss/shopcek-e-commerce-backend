/**
 * variant service
 */

import { factories, Strapi } from '@strapi/strapi'

import { cartesian } from '../../../helpers/math'

function services({ strapi: Strapi }) {
    return {
        async createVariants({ product, sizes, colors }: { product: number; sizes: number[]; colors: number[] }) {
            const combinations = cartesian(sizes, colors)

            const result = []
            for (let index = 0; index < combinations.length; index++) {
                const combination = combinations[index]
                result.push(
                    await strapi.entityService.create('api::variant.variant', {
                        data: {
                            product: product,
                            size: combination[0],
                            color: combination[1]
                        },
                        populate: {
                            size: '*',
                            color: '*'
                        } as any
                    })
                )
            }

            return result
        }
    }
}

export default factories.createCoreService('api::variant.variant', services)

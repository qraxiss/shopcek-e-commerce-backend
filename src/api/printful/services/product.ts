/**
 *  service
 */

import { Strapi } from '@strapi/strapi'

import { mergeVariantData, getUniqueSizesAndColors } from '../helpers'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getPrintfulFullProduct(printful_id) {
        const { product_id, variants: variantsDataP1 } = await strapi.service('api::printful.api').getVariants(printful_id)
        const { description, variants: variantsDataP2 } = await strapi.service('api::printful.api').getProduct(product_id)

        const variants = mergeVariantData(variantsDataP1, variantsDataP2)

        return {
            product_id,
            description,
            variants,
            ...getUniqueSizesAndColors(variants)
        }
    },

    async getAll() {
        return await strapi.db?.query('api::printful.printful-product').findMany()
    },

    async search({ name }) {
        return await strapi.entityService.findMany('api::printful.printful-product', {
            filters: {
                name: {
                    $containsi: name
                }
            }
        })
    },

    async getProductDetailsBySlug({ slug }) {
        const product = await strapi.db.query('api::printful.printful-product').findOne({
            where: {
                slug
            },
            populate: {
                video: true,
                categories: true
            }
        })

        const variants = await strapi.entityService.findMany('api::printful.printful-variant', {
            filters: {
                product: product.id
            },

            populate: {
                color: true,
                size: true
            }
        })

        return {
            product,
            variants: variants.map((variant) => {
                return {
                    id: variant.id,
                    variant
                }
            })
        }
    }
})

// export default factories.createCoreService('api::printful.printful-product', services)

async function product(obj, { slug }: { slug: string }, context) {}

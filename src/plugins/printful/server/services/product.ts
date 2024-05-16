/**
 *  service
 */

import { Strapi } from '@strapi/strapi'

import { mergeVariantData, getUniqueSizesAndColors } from '../helpers'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getPrintfulFullProduct(printful_id) {
        const { product_id, variants: variantsDataP1 } = await strapi.plugin('printful').service('api').getVariants(printful_id)
        const { description, variants: variantsDataP2 } = await strapi.plugin('printful').service('api').getProduct(product_id)

        const variants = mergeVariantData(variantsDataP1, variantsDataP2)

        return {
            product_id,
            description,
            variants,
            ...getUniqueSizesAndColors(variants)
        }
    }
})

// export default factories.createCoreService('plugin::printful.printful-product', services)

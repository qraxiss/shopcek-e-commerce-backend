import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    product: {
        resolve: async (obj, { slug }, context) => {
            return await strapi.service('api::printful.product').getProductDetailsBySlug({ slug })
        }
    },

    search: {
        resolve: async (obj, { name }, context) => {
            return await strapi.service('api::printful.product').search({ name })
        }
    }
})

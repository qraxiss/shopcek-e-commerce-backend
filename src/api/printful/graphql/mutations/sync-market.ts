import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    syncMarket: {
        resolve: async (obj, args, context) => {
            return strapi.service('api::printful.sync').sync()
        }
    }
})

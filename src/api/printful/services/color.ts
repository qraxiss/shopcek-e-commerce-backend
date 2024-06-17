/**
 *  service
 */

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAll() {
        return await strapi.db?.query('api::printful.printful-color').findMany()
    }
})

// export default factories.createCoreService('api::printful.printful-color', service)

/**
 *  service
 */

import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAll() {
        return await strapi.db?.query('plugin::printful.printful-color').findMany()
    }
})

// export default factories.createCoreService('plugin::printful.printful-color', service)

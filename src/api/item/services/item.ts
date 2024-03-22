/**
 * item service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::item.item'

    return {}
}

export default factories.createCoreService('api::item.item', services)

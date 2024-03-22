/**
 * size service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::cart.cart'

    return {

        

    }
}


export default factories.createCoreService('api::size.size', services);

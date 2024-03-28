/**
 * earn-login service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::earn-login.earn-login'

    return {}
}

export default factories.createCoreService('api::earn-login.earn-login')

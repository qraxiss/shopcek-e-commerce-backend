/**
 * category service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async getBySlug({ slug }: { slug: string }) {
            return strapi.db.query('api::category.category').findOne({
                where: {
                    slug
                }
            })
        }
    }
}

export default factories.createCoreService('api::category.category', services)

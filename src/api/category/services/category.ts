/**
 * category service
 */

import { factories, Strapi } from '@strapi/strapi'
import { slugGen } from '../../../helpers/slug'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async createWithSlug({ data }) {
            data.slug = slugGen(data.name)
            return await strapi.entityService.create('api::category.category', {
                data
            })
        },

        async getBySlug({ slug }: { slug: String }) {
            return strapi.db.query('api::category.category').findOne({
                where: {
                    slug
                }
            })
        }
    }
}

export default factories.createCoreService('api::category.category', services)

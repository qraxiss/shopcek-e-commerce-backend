/**
 * collection service
 */

import { factories, Strapi } from '@strapi/strapi'
import { slugGen } from '../../../helpers/slug'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async createWithSlug({ data }) {
            data.slug = slugGen(data.name)
            return await strapi.entityService.create('api::collection.collection', {
                data
            })
        },

        async getBySlug({ slug }: { slug: String }) {
            return strapi.db.query('api::collection.collection').findOne({
                where: {
                    slug
                }
            })
        }
    }
}

export default factories.createCoreService('api::collection.collection', services)

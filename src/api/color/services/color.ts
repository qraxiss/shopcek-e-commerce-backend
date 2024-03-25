/**
 * color service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::color.color'

    return {
        async findByValue({ value }: { value: string }) {
            return await strapi.db.query(service).findOne({
                where: {
                    value
                }
            })
        },

        async findAndCreateIfNotExist({ value }: { value: string }) {
            const data = await strapi.service(service).findByValue({ value })
            if (!data) {
                try {
                    return await strapi.entityService.create(service, {
                        data: {
                            value
                        }
                    })
                } catch {}
            } else {
                return data
            }
        },

        async bulkFinAndCreateIfNotExist({ values }: { values: string[] }) {
            let result = []

            for (let index = 0; index < values.length; index++) {
                const value = values[index]
                result.push(await strapi.service(service).findAndCreateIfNotExist({ value }))
            }
            return result
        }
    }
}

export default factories.createCoreService('api::color.color', services)

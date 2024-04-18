/**
 * size service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const service = 'api::size.size'

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
            if (data) {
                return data
            }


            try {
                const data = await strapi.entityService.create(service, {
                    data: {
                        value
                    }
                })
                return data
            } catch {}
        },

        async bulkFinAndCreateIfNotExist({ values }: { values: string[] }) {
            let result = []

            for (let index = 0; index < values.length; index++) {
                const value = values[index]
                const data = await strapi.service(service).findAndCreateIfNotExist({ value })

                if (data) {
                    result.push(data)
                }
            }
            return result
        }
    }
}

export default factories.createCoreService('api::size.size', services)

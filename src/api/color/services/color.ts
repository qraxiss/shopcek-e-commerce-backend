/**
 * color service
 */

import { factories, Strapi } from '@strapi/strapi'
import colors from '../../../helpers/colors_db.json'

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
                    const hex = colors[value]
                    return await strapi.entityService.create(service, {
                        data: {
                            value,
                            hex
                        }
                    })
                } catch (e) {
                    // (e)
                }
            } else {
                return data
            }
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

export default factories.createCoreService('api::color.color', services)

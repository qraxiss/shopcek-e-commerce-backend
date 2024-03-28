/**
 * recipient service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async getRecipientByUser({ userId }) {
            return await strapi.db.query('api::recipient.recipient').findOne({
                where: {
                    user: userId
                }
            })
        },

        async updateRecipientByUser({ userId, recipient }) {
            return await strapi.db.query('api::recipient.recipient').update({
                where: {
                    user: userId
                },
                data: recipient
            })
        }
    }
}

export default factories.createCoreService('api::recipient.recipient', services)

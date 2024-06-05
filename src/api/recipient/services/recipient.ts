/**
 * recipient service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async getRecipientByUser({ userId, id }) {
            return await strapi.db.query('api::recipient.recipient').findOne({
                where: {
                    user: userId,
                    id
                }
            })
        },

        async getRecipientsByUser({ userId }) {
            return await strapi.db.query('api::recipient.recipient').findMany({
                where: {
                    user: userId
                }
            })
        },

        async updateRecipientByUser({ userId, recipient, id }) {
            return await strapi.db.query('api::recipient.recipient').update({
                where: {
                    user: userId,
                    id
                },
                data: recipient
            })
        },

        async createRecipientByUser({ userId, recipient }) {
            return await strapi.entityService.create('api::recipient.recipient', {
                data: {
                    user: userId,
                    ...recipient
                }
            })
        },

        async deleteRecipientByUser({ userId, id }) {
            return await strapi.db.query('api::recipient.recipient').delete({
                where: {
                    id,
                    user: userId
                }
            })
        }
    }
}

export default factories.createCoreService('api::recipient.recipient', services)

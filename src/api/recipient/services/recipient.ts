/**
 * recipient service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    return {
        async getRecipientByUser({ userId, title }) {
            return await strapi.db.query('api::recipient.recipient').findOne({
                where: {
                    user: userId,
                    title
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

        async updateRecipientByUser({ userId, recipient, title }) {
            return await strapi.db.query('api::recipient.recipient').update({
                where: {
                    user: userId,
                    title
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

        async deleteRecipientByUser({ userId, title }) {
            return await strapi.db.query('api::recipient.recipient').delete({
                where: {
                    title,
                    user: userId
                }
            })
        }
    }
}

export default factories.createCoreService('api::recipient.recipient', services)

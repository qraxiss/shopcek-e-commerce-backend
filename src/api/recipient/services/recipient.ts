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

        async getActiveRecipient({ userId }) {
            console.log(userId)
            return await strapi.db.query('api::recipient.recipient').findOne({
                where: {
                    user: userId,
                    isActive: true
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
        },

        async selectRecipientByUser({ userId, id }) {
            const activeRecipient = await strapi.service('api::recipient.recipient').getActiveRecipient({ userId })

            if (!activeRecipient) {
                return strapi.db.query('api::recipient.recipient').update({
                    where: {
                        user: userId,
                        id
                    },
                    data: {
                        isActive: true
                    }
                })
            }

            if (activeRecipient.id == id) {
                return activeRecipient
            }

            return Promise.all([
                strapi.db.query('api::recipient.recipient').update({
                    where: {
                        user: userId,
                        id: activeRecipient.id
                    },
                    data: {
                        isActive: false
                    }
                }),
                strapi.db.query('api::recipient.recipient').update({
                    where: {
                        user: userId,
                        id
                    },
                    data: {
                        isActive: true
                    }
                })
            ])
        }
    }
}

export default factories.createCoreService('api::recipient.recipient', services)

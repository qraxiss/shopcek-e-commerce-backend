import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getRecipientByUser({ userId, id }) {
        return await strapi.db.query('api::order.recipient').findOne({
            where: {
                user: userId,
                id
            }
        })
    },

    async getActiveRecipient({ userId }) {
        console.log(userId)
        return await strapi.db.query('api::order.recipient').findOne({
            where: {
                user: userId,
                isActive: true
            }
        })
    },

    async getRecipientsByUser({ userId }) {
        return await strapi.db.query('api::order.recipient').findMany({
            where: {
                user: userId
            }
        })
    },

    async updateRecipientByUser({ userId, recipient, id }) {
        return await strapi.db.query('api::order.recipient').update({
            where: {
                user: userId,
                id
            },
            data: recipient
        })
    },

    async createRecipientByUser({ userId, recipient }) {
        return await strapi.entityService.create('api::order.recipient', {
            data: {
                user: userId,
                ...recipient
            }
        })
    },

    async deleteRecipientByUser({ userId, id }) {
        return await strapi.db.query('api::order.recipient').delete({
            where: {
                id,
                user: userId
            }
        })
    },

    async selectRecipientByUser({ userId, id }) {
        const activeRecipient = await strapi.service('api::order.recipient').getActiveRecipient({ userId })

        if (!activeRecipient) {
            return strapi.db.query('api::order.recipient').update({
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
            strapi.db.query('api::order.recipient').update({
                where: {
                    user: userId,
                    id: activeRecipient.id
                },
                data: {
                    isActive: false
                }
            }),
            strapi.db.query('api::order.recipient').update({
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
})

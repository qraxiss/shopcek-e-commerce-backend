import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async registerWithWallet({ address }: { address: string }) {
        const walletObj = await strapi.entityService?.create('api::wallet.wallet', {
            data: {
                address
            }
        })

        const user = await strapi.db?.query('plugin::users-permissions.user').create({
            data: {
                wallet: walletObj?.id
            }
        })

        const cart = await strapi.entityService?.create('api::cart.cart', {
            data: {
                user: user.id
            }
        })

        return strapi.plugin('users-permissions').service('jwt').issue({ id: user.id })
    },

    async loginWithWallet({ id }: { id: number }) {
        return strapi.plugin('users-permissions').service('jwt').issue({ id })
    },

    async connectWallet({ address }: { address: string }) {
        const user = await strapi.db?.query('api::wallet.wallet').findOne({
            where: {
                address
            },
            populate: {
                user: '*'
            }
        })

        if (!user) {
            return strapi.plugin('user').service('wallet').registerWithWallet({ address })
        }

        return strapi.plugin('user').service('wallet').loginWithWallet(user)
    }
})

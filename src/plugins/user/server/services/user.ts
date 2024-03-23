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
                wallet: walletObj?.id,
                role: [1]
            }
        })

        const cart = await strapi.entityService?.create('api::cart.cart', {
            data: {
                user: user.id
            }
        })

        const recipient = await strapi.entityService?.create('api::recipient.recipient', {
            data:{
                user: user.id
            }
        })

        return strapi.plugin('users-permissions').service('jwt').issue({ id: user.id })
    },

    async loginWithWallet({ id }: { id: number }) {
        return strapi.plugin('users-permissions').service('jwt').issue({ id: id })
    },

    async connectWallet({ address }: { address: string }) {
        const wallet = await strapi.db?.query('api::wallet.wallet').findOne({
            where: {
                address
            },
            populate: {
                user: '*',
            }
        })

        if (!wallet) {
            return strapi.plugin('user').service('wallet').registerWithWallet({ address })
        }

        if (!wallet.user){

        }

        return strapi.plugin('user').service('wallet').loginWithWallet(wallet.user)
    }
})

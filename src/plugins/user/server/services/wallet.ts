import { Strapi } from '@strapi/strapi'

function earn() {
    return strapi.service('api::earn.earn')
}

function wishlist() {
    return strapi.service('api::wishlist.wishlist')
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async registerWithWallet({ address }: { address: string }) {
        const wallet = await strapi.entityService!.create('api::wallet.wallet', {
            data: {
                address
            }
        })

        const user = await strapi.db!.query('plugin::users-permissions.user').create({
            data: {
                wallet: wallet.id,
                role: [1]
            }
        })

        const cart = await strapi.entityService!.create('api::cart.cart', {
            data: {
                user: user.id
            }
        })

        await earn().createEarnForUser(user)
        await wishlist().createWishlistForUser(user)

        const recipient = await strapi.entityService?.create('api::recipient.recipient', {
            data: {
                user: user.id
            }
        })

        return strapi.plugin('users-permissions').service('jwt').issue({ id: user.id })
    },

    async loginWithWallet({ id }: { id: number }) {
        const user = await strapi.db?.query('plugin::users-permissions.user').findOne({
            where: {
                id
            }
        })

        return strapi.plugin('users-permissions').service('jwt').issue({ id: id })
    },

    async connectWallet({ address }: { address: string }) {
        const wallet = await strapi.db?.query('api::wallet.wallet').findOne({
            where: {
                address
            },
            populate: {
                user: '*'
            }
        })

        if (!wallet) {
            return strapi.plugin('user').service('wallet').registerWithWallet({ address })
        }

        if (!wallet.user) {
            console.log(
                await strapi.db?.query('api::wallet.wallet').delete({
                    where: {
                        id: wallet.id
                    }
                })
            )
            throw new Error('Try again!')
        }

        return strapi.plugin('user').service('wallet').loginWithWallet({ id: wallet.user.id })
    }
})

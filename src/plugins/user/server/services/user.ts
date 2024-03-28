import { Strapi } from '@strapi/strapi'

function earn() {
    return strapi.service('api::earn.earn')
}

function wishlist() {
    return strapi.service('api::wishlist.wishlist')
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async registerWithWallet({ address, cartId }: { address: string; cartId?: string }) {
        const walletObj = await strapi.entityService?.create('api::wallet.wallet', {
            data: {
                address
            }
        })

        const user = await strapi.db?.query('plugin::users-permissions.user').create({
            data: {
                wallet: walletObj?.id,
                role: [1],
                cart: cartId
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

    async loginWithWallet({ id, cartId }: { id: number; cartId: number }) {
        const newCart = await strapi.entityService?.findOne('api::cart.cart', cartId, {
            populate: {
                items: {
                    populate: {
                        variant: true
                    }
                }
            }
        })

        const user = await strapi.db?.query('plugin::users-permissions.user').findOne({
            where: {
                id
            },
            populate: {
                cart: '*'
            }
        })

        console.log(
            await Promise.all(
                newCart!.items.map(async (item) => {
                    await strapi.service('api::item.item').createSync({ cartId: user.cart.id, variantId: item.variant.id, count: item.count })
                })
            )
        )

        return strapi.plugin('users-permissions').service('jwt').issue({ id: id })
    },

    async connectWallet({ address, cartId }: { address: string; cartId?: string }) {
        const wallet = await strapi.db?.query('api::wallet.wallet').findOne({
            where: {
                address
            },
            populate: {
                user: '*'
            }
        })

        if (!wallet) {
            return strapi.plugin('user').service('wallet').registerWithWallet({ address, cartId })
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

        return strapi.plugin('user').service('wallet').loginWithWallet({ id: wallet.user.id, cartId })
    }
})

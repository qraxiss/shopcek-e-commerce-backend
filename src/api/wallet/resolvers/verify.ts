import { SiweMessage } from 'siwe'

export default async (obj, { message, signature }, context) => {
    const siweMessage = new SiweMessage(message)
    const {
        success,
        data: { address }
    } = await siweMessage.verify({ signature })

    if (success) {
        const jwt = await strapi.plugin('user').service('wallet').connectWallet({ address, cartId: 43 })
        return jwt
    }
}

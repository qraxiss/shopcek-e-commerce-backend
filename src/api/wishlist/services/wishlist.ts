/**
 * wishlist service
 */

import { factories, Strapi } from '@strapi/strapi'

function services({ strapi }: { strapi: Strapi }) {
    const mainService = 'api::wishlist.wishlist'

    return {
        async addToWishlist({ wishlistId, productId }) {
            return await strapi.entityService.update(mainService, wishlistId, {
                data: {
                    items: {
                        connect: [productId]
                    }
                }
            })
        },

        async removeFromWishlist({ wishlistId, productId }) {
            return await strapi.entityService.update(mainService, wishlistId, {
                data: {
                    items: {
                        disconnect: [productId]
                    }
                }
            })
        },

        async getWishlist({ wishlistId }) {
            return await strapi.entityService.findOne(mainService, wishlistId, {
                populate: {
                    items: true
                }
            })
        },

        async createWishlistForUser(id) {
            return await strapi.entityService.create(mainService, {
                data: {
                    user: id
                }
            })
        }
    }
}

export default factories.createCoreService('api::wishlist.wishlist', services)

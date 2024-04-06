function wishlist() {
    return strapi.service('api::wishlist.wishlist')
}

async function wishlistId(context) {
    const id = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: context.state.user.id
            },
            populate: {
                wishlist: '*'
            }
        })
    ).wishlist.id

    return id
}

async function productId({ slug }: { slug: string }) {
    return (
        await strapi.db.query('api::product.product').findOne({
            where: {
                slug
            }
        })
    ).id
}

export async function addToWishlist(obj, { slug }, context) {
    return await wishlist().addToWishlist({
        wishlistId: await wishlistId(context),
        productId: await productId({ slug })
    })
}

export async function removeFromWishlist(obj, { slug }, context) {
    return await wishlist().removeFromWishlist({
        wishlistId: await wishlistId(context),
        productId: await productId({ slug })
    })
}

export async function userWishlist(obj, args, context) {
    return await wishlist().getWishlist({
        wishlistId: await wishlistId(context)
    })
}

// import product from './api/product/resolvers/product'
import cart from './api/cart/resolvers/cart'
import order from './api/order/resolvers/order'
import recipient from './api/order/resolvers/recipient'
import wishlist from './api/wishlist/resolvers/wishlist'
import category from './api/category/resolvers/category'
import wallet from './api/wallet/resolvers/wallet'

import printful from './api/printful/graphql'

async function test(obj, args, context) {
    console.log(strapi.service('api::order.order'))
    return 'sex'
}

export async function registerResolvers() {
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::cart.cart').disableActions(['create', 'update', 'delete', 'findOne'])
    await strapi
        .plugin('graphql')
        .service('extension')
        .shadowCRUD('api::cart.item')
        .disableActions(['create', 'update', 'delete', 'findMany', 'findOne'])
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::order.order').disableAction('findMany')
    // await strapi.plugin('graphql').service('extension').shadowCRUD('api::product.product').disableActions(['findOne'])
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::category.category').disableActions(['findOne', 'create'])

    // await strapi.service('plugin::graphql.extension').use(product)
    await strapi.service('plugin::graphql.extension').use(cart)
    await strapi.service('plugin::graphql.extension').use(order)
    await strapi.service('plugin::graphql.extension').use(wishlist)
    await strapi.service('plugin::graphql.extension').use(recipient)
    await strapi.service('plugin::graphql.extension').use(category)
    await strapi.service('plugin::graphql.extension').use(wallet)

    printful({ strapi })

    strapi.service('plugin::graphql.extension').use(({ strapi }) => ({
        typeDefs: `
                type Mutation {
                    test(data:JSON): JSON
                }
            `,
        resolvers: {
            Mutation: {
                test: {
                    resolve: test
                }
            }
        }
    }))
}

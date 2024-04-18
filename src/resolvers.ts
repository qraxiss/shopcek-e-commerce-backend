import product from './api/product/resolvers/product'
import cart from './api/cart/resolvers/cart'
import order from './api/order/resolvers/order'
import earn from './api/earn/resolvers/earn'
import domain from './api/domain/resolvers/domain'
import wishlist from './api/wishlist/resolvers/wishlist'
import recipient from './api/recipient/resolvers/recipient'
import apply from './api/apply/resolvers/apply'
import category from './api/category/resolvers/category'

import { getVariant } from './helpers/printful'

import { syncThumbnails } from './helpers/thumbnails'

async function test(obj, args, context) {
    return [
        await strapi.db.query('api::variant.variant').deleteMany({
            count: false
        }),
        await strapi.db.query('api::product.product').deleteMany({
            count: false
        }),
        await strapi.db.query('api::size.size').deleteMany({
            count: false
        }),
        await strapi.db.query('api::color.color').deleteMany({
            count: false
        })
    ]
}

export async function registerResolvers() {
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::cart.cart').disableActions(['create', 'update', 'delete', 'findOne'])
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::order.order').disableAction('findMany')
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::product.product').disableActions(['findOne'])
    await strapi.plugin('graphql').service('extension').shadowCRUD('api::category.category').disableActions(['findOne', 'create'])

    await strapi.service('plugin::graphql.extension').use(product)
    await strapi.service('plugin::graphql.extension').use(cart)
    await strapi.service('plugin::graphql.extension').use(order)
    await strapi.service('plugin::graphql.extension').use(earn)
    await strapi.service('plugin::graphql.extension').use(domain)
    await strapi.service('plugin::graphql.extension').use(wishlist)
    await strapi.service('plugin::graphql.extension').use(recipient)
    await strapi.service('plugin::graphql.extension').use(apply)
    await strapi.service('plugin::graphql.extension').use(category)

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

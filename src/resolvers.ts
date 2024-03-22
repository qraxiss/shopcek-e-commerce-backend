import product from './api/product/resolvers/product'

import { getAllProductsDetails } from './helpers/printful'

import { cartesian } from './helpers/math'

async function test(obj, args, context) {
    // return await strapi.service('api::product.product').createPrintfulProduct({
    //     product: {
    //         name: 'Travel mug with a handle',
    //         image: 'https://files.cdn.printful.com/files/1a1/1a1907c208f06007a280197bc4410878_preview.png',
    //         price: 22,
    //         sizes: ['25 oz'],
    //         colors: ['White']
    //     },
    //     variants: [
    //         {
    //             price: 22,
    //             image: 'https://files.cdn.printful.com/files/5e4/5e4abe7b4d2e4e54de6151f7f628636b_preview.png',
    //             size: '25 oz',
    //             color: 'White',
    //             printful_id: 4287721568
    //         }
    //     ],
    //     printful_id: 338000032
    // })

    // return cartesian([1,2,3], [4,5,6])

    return await strapi.service('api::cart.cart').updateCount({
        itemId: 3,
        count: 5
    })

    return await strapi.entityService.findOne('api::cart.cart', 2, {
        populate: {
            'items': true
        }
    })


    return strapi.requestContext.get().state.user

    return strapi.plugin('user').service('wallet').connectWallet({ address: 'b313dssd1' })

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

    return getAllProductsDetails()
}

export function registerResolvers() {
    strapi.service('plugin::graphql.extension').use(product)

    strapi.service('plugin::graphql.extension').use(({ strapi }) => ({
        typeDefs: `
                type Mutation {
                    test(data:JSON): JSON
                }
            `,
        resolversConfig: {
            Query: {},
            Mutation: {}
        },
        resolvers: {
            Query: {},
            Mutation: {
                test: {
                    resolve: test
                }
            }
        }
    }))
}

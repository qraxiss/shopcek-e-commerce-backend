const typeDefs = `
    type Mutation {
        syncPrintfulMarket: JSON!
    }

    type ProductDetails {
        product: Product
        variants: [Variant]
    }

    type Query {
        product(slug: String!): ProductDetails
    }
`

async function syncPrintfulMarket() {
    return await strapi.service('api::product.product').syncPrintfulMarket()
}

async function product(obj, { slug }: { slug: string }, context) {
    const product = await strapi.db.query('api::product.product').findOne({
        where: {
            slug
        }
    })

    const variants = await strapi.entityService.findMany('api::variant.variant', {
        filters: {
            product: product.id
        },

        populate: {
            color: true,
            size: true
        }
    })

    return { product, variants }
}

export default ({ strapi }) => ({
    typeDefs,
    resolversConfig: {
        'Query.product': {
            auth: false
        },
        Mutation: {}
    },
    resolvers: {
        Query: {
            product: {
                resolve: product
            }
        },
        Mutation: {
            syncPrintfulMarket: {
                resolve: syncPrintfulMarket
            }
        }
    }
})

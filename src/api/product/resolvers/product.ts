const typeDefs = `
    type Mutation {
        syncPrintfulMarket: JSON!
    }

    type Query {
        product(slug: String!): Product
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

    return product
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

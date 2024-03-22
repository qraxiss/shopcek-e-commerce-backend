const typeDefs = `
    type Mutation {
        syncPrintfulMarket: JSON!
    }
`

async function syncPrintfulMarket() {
    return await strapi.service('api::product.product').syncPrintfulMarket()
}

export default ({ strapi }) => ({
    typeDefs,
    resolversConfig: {
        Query: {},
        Mutation: {}
    },
    resolvers: {
        Query: {},
        Mutation: {
            syncPrintfulMarket: {
                resolve: syncPrintfulMarket
            }
        }
    }
})

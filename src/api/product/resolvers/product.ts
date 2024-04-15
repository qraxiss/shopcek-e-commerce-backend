import { getScreenshot, syncThumbnails } from "../../../helpers/thumbnails"
const typeDefs = `
    type Mutation {
        syncPrintfulMarket: JSON!
        syncVideoThumbnails: JSON
    }

    type VariantId {
        variant: Variant
        id: ID
    }

    type ProductDetails {
        product: Product
        variants: [VariantId]
    }

    type Query {
        product(slug: String!): ProductDetails
        search(name: String!): [Product]
    }
`

async function syncPrintfulMarket() {
    return await strapi.service('api::product.product').syncPrintfulMarket()
}

async function product(obj, { slug }: { slug: string }, context) {
    const product = await strapi.db.query('api::product.product').findOne({
        where: {
            slug
        },
        populate: {
            video: true
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

    return {
        product,
        variants: variants.map((variant) => {
            return {
                id: variant.id,
                variant
            }
        })
    }
}

async function search(obj, { name }: { name: string }, context) {
    return await strapi.service('api::product.product').search({ name })
}

async function syncVideoThumbnails(){
    return await syncThumbnails()
}

export default ({ strapi }) => ({
    typeDefs,
    resolversConfig: {
        'Query.product': {
            auth: false
        },
        'Query.search': {
            auth: false
        },
        Mutation: {}
    },
    resolvers: {
        Query: {
            product: {
                resolve: product
            },
            search: {
                resolve: search
            }
        },
        Mutation: {
            syncPrintfulMarket: {
                resolve: syncPrintfulMarket
            },
            syncVideoThumbnails: {
                resolve: syncVideoThumbnails
            }
        }
    }
})

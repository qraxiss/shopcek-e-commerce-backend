import { Strapi } from '@strapi/strapi'

const typeDefs = `
    type CategoryDetails {
        category: Category
        products: [ProductDetails]
    }


    type Query {
        category (slug: String!): CategoryDetails
    }

    type Mutation {
        createCategory(data:CategoryInput!): Category
    }
`

async function category(obj, { slug }: { slug: string }, context) {
    const category = await strapi.service('api::category.category').getBySlug({ slug })

    if (!category) {
        return {
            category: null,
            products: null
        }
    }

    const products = await strapi.db.query('api::product.product').findMany({
        filters: {
            categories: [category.id]
        }
    })

    return { category, products }
}

async function createCategory(obj, { data }, context) {
    return await strapi.entityService.create('api::category.category', {
        data
    })
}

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            category: {
                resolve: category
            }
        },
        Mutation: {
            createCategory: {
                resolve: createCategory
            }
        }
    },
    resolversConfig: {
        'Query.category': {
            auth: false
        }
    }
})

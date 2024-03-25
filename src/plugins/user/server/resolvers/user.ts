import { GraphQLError } from 'graphql'

const typeDefs = `
    type Mutation {
        connectWallet(address:String!, cartId:ID): String!
    }

    type UserQuery {
        recipient: Recipient
        wallet: Wallet
        orders: [Order]
    }

    type Query {
        user: UserQuery
    }
`

async function connectWallet(obj, { address, cartId }, context) {
    if (context.state.user) {
        throw new GraphQLError('You already logged in!')
    }

    console.log(address,cartId)

    return await strapi.plugin('user').service('wallet').connectWallet({ address, cartId })
}

async function user(obj,args,context){
    return await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            recipient: "*",
            wallet: "*",
        }
    })
}

export default ({ strapi }) => ({
    typeDefs,
    resolversConfig: {
        Query: {},
        Mutation: {
            connectWallet: {
                auth: false
            }
        }
    },
    resolvers: {
        Mutation: {
            connectWallet: {
                resolve: connectWallet
            }
        },
        Query: {
            user: {
                resolve: user
            }
        }
    }
})

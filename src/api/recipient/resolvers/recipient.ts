import { Strapi } from '@strapi/strapi'

function userId(context) {
    return context.state.user.id
}

function recipient() {
    return strapi.service('api::recipient.recipient')
}

async function getRecipientByUser(obj, args, context) {
    return await recipient().getRecipientByUser({
        userId: userId(context)
    })
}

async function updateRecipientByUser(obj, { recipient: recipientData }, context) {
    return await recipient().updateRecipientByUser({
        userId: userId(context),
        recipient: recipientData
    })
}

const typeDefs = `
    type Query {
        recipientByUser: JSON
    }


    type Mutation {
        recipientByUser(recipient:JSON!): JSON
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            recipientByUser: {
                resolve: getRecipientByUser
            }
        },
        Mutation: {
            recipientByUser: {
                resolve: updateRecipientByUser
            }
        }
    }
})

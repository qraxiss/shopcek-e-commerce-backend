import { Strapi } from '@strapi/strapi'

function userId(context) {
    return context.state.user.id
}

function recipient() {
    return strapi.service('api::recipient.recipient')
}

async function getRecipientByUser(obj, { id }, context) {
    return await recipient().getRecipientByUser({
        userId: userId(context),
        id
    })
}

async function updateRecipientByUser(obj, { recipient: recipientData, id }, context) {
    return await recipient().updateRecipientByUser({
        userId: userId(context),
        recipient: recipientData,
        id
    })
}

async function getRecipientsByUser(obj, args, context) {
    return await recipient().getRecipientsByUser({ userId: userId(context) })
}

async function createRecipientByUser(obj, { recipient: recipientData }, context) {
    return await recipient().createRecipientByUser({ userId: userId(context), recipient: recipientData })
}

async function deleteRecipientByUser(obj, { id }, context) {
    return await recipient().deleteRecipientByUser({ userId: userId(context), id })
}

const typeDefs = `
    type Query {
        recipientByUser(id: ID!): JSON
        recipientsByUser: [JSON]
    }


    type Mutation {
        recipientByUser(recipient:JSON!, id: ID!): JSON!
        createRecipientByUser(recipient: JSON!): JSON!
        deleteRecipientByUser(id: ID!): JSON!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Query: {
            recipientByUser: {
                resolve: getRecipientByUser
            },
            recipientsByUser: {
                resolve: getRecipientsByUser
            }
        },
        Mutation: {
            recipientByUser: {
                resolve: updateRecipientByUser
            },
            createRecipientByUser: {
                resolve: createRecipientByUser
            },
            deleteRecipientByUser: {
                resolve: deleteRecipientByUser
            }
        }
    }
})

import { Strapi } from '@strapi/strapi'

function userId(context) {
    return context.state.user.id
}

function recipient() {
    return strapi.service('api::recipient.recipient')
}

async function getRecipientByUser(obj, { title }, context) {
    return await recipient().getRecipientByUser({
        userId: userId(context),
        title
    })
}

async function updateRecipientByUser(obj, { recipient: recipientData, title }, context) {
    return await recipient().updateRecipientByUser({
        userId: userId(context),
        recipient: recipientData,
        title
    })
}

async function getRecipientsByUser(obj, args, context) {
    return await recipient().getRecipientsByUser({ userId: userId(context) })
}

async function createRecipientByUser(obj, { recipient: recipientData }, context) {
    return await recipient().createRecipientByUser({ userId: userId(context), recipient: recipientData })
}

async function deleteRecipientByUser(obj, { title }, context) {
    return await recipient().deleteRecipientByUser({ userId: userId(context), title })
}

const typeDefs = `
    type Query {
        recipientByUser(title: String!): JSON
        recipientsByUser: [JSON]
    }


    type Mutation {
        recipientByUser(recipient:JSON!, title: String!): JSON!
        createRecipientByUser(recipient: JSON!): JSON!
        deleteRecipientByUser(title: String!): JSON!
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

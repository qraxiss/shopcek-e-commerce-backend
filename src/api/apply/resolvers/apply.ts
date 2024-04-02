import { Strapi } from '@strapi/strapi'

const typeDefs = `
    type Mutation {
        sendInformation(email: String, telegramHandle: String, name: String, partnerName: String): Boolean!
    }
`

export default ({ strapi }: { strapi: Strapi }) => ({
    typeDefs,
    resolvers: {
        Mutation: {
            sendInformation: {
                resolve: async (obj, { email, telegramHandle, name, partnerName }, context) => {
                    return !!(await strapi.entityService.create('api::apply.apply', {
                        data: {
                            email,
                            partnerName,
                            name,
                            telegramHandle
                        }
                    }))
                }
            }
        }
    },
    resolversConfig: {
        'Mutation.sendInformation': {
            auth:false
        }
    }
})

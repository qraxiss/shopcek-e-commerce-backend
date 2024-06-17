import { Strapi } from '@strapi/strapi'
import Mutations from './mutations'
import Queries from './queries'
import typeDefs from './types'
import resolversConfig from './resolvers-config'

export default ({ strapi }: { strapi: Strapi }) => {
    const extensionService = strapi.plugin('graphql').service('extension')

    extensionService.use({
        typeDefs,
        resolversConfig,
        resolvers: {
            Mutation: Mutations({ strapi }),
            Query: Queries({ strapi })
        }
    })
}

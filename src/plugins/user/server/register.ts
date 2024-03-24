import { Strapi } from '@strapi/strapi'
import wallet from './resolvers/user'

export function registerResolvers() {
    strapi.service('plugin::graphql.extension').use(wallet)
}

export default ({ strapi }: { strapi: Strapi }) => {
    registerResolvers()
}

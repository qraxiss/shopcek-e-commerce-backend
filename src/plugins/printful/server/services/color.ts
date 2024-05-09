import { Strapi } from '@strapi/strapi'
export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllColors() {
        const sizes = await strapi.entityService?.findMany('api::size.size')

        return sizes
    }
})

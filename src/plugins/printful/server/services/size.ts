import { Strapi } from '@strapi/strapi'
export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllSizes() {
        const sizes = await strapi.entityService?.findMany('api::size.size')

        return sizes
    },
})

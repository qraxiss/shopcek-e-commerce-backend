import { Strapi } from '@strapi/strapi'

import product from './product'

export default ({ strapi }: { strapi: Strapi }) => ({
    ...product({ strapi })
})

import { Strapi } from '@strapi/strapi'

import syncMarket from './sync-market'

export default ({ strapi }: { strapi: Strapi }) => ({
    ...syncMarket({ strapi })
})

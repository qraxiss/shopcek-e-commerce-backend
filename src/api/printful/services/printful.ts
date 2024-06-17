import api from './api'
import sync from './sync'
import product from './product'
import size from './size'
import color from './color'
import order from './order'
import variant from './variant'

import { Strapi } from '@strapi/strapi'

import graphql from '../graphql'

export default ({ strapi }: { strapi: Strapi }) => {
    graphql({ strapi })

    return {
        api,
        sync,
        product,
        size,
        color,
        order,
        variant
    }
}

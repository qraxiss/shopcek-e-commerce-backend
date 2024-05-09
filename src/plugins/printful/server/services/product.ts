import { Strapi } from '@strapi/strapi'

import { getAllProducts } from '../api/product'

interface PrintfulProduct {
    name: string
    price: number
    sizes: number[] //relation
    colors: number[] // relation
    image: string
    description: string | undefined
    printful_id: string | number
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllProducts() {
        const result = await getAllProducts()
        return result.map((item) => ({
            printful_id: String(item.id),
            image: item.thumbnail_url,
            name: item.name
        }))
    },
    async createProduct(product: PrintfulProduct) {
        
    }
})

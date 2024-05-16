import { Strapi } from '@strapi/strapi'
import { getAllProducts, getProduct, getVariants } from '../api'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllProductsFromActiveMarket() {
        const result = await getAllProducts()
        return result.map((item) => ({
            printful_id: String(item.id),
            image: item.thumbnail_url,
            name: item.name
        }))
    },

    async getProduct(product_id) {
        const {
            product: { id, description },
            variants
        } = await getProduct(product_id)

        return {
            product_id: id,
            description,
            variants: variants.map((variant) => ({
                status: variant.availability_status,
                variant_id: variant.id,
                color: {
                    hex: variant.color_code,
                    name: variant.color
                },
                size: variant.size,
                price: Number(variant.price)
            }))
        }
    },
    async getVariants(printful_id) {
        const result = await getVariants(printful_id)
        const product_id = result.sync_variants[0].product.product_id
        const variants = result.sync_variants.map((variant) => ({
            image: variant.files.find((item) => {
                return item.type === 'preview'
            }).preview_url,
            printful_id: variant.id,
            variant_id: variant.product.variant_id
        }))

        return {
            product_id,
            variants
        }
    }
})

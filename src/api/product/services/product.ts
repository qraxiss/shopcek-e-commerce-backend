/**
 * product service
 */

import { factories, Strapi } from '@strapi/strapi'
import { getAllProductsDetails } from '../../../helpers/printful'

interface Product {
    name: string
    price: number
    sizes: string[]
    colors: string[]
    image?: string
    description?: string | undefined
    printful_id?: string | number
}

interface PrintfulProduct extends Product {
    printful_id: number
}

function services({ strapi: Strapi }) {
    return {
        async createPrintfulProduct({
            printful_id,
            variants,
            product,
            colors,
            sizes
        }: {
            printful_id: number
            variants: any[]
            product: PrintfulProduct
            colors: any[]
            sizes: any[]
        }) {
            const sizeIds = sizes.map((size) => {
                return size.id
            })

            const colorIds = colors.map((color) => {
                return color.id
            })

            const createdProduct = await strapi.entityService.create('api::product.product', {
                data: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    colors: colorIds,
                    sizes: sizeIds,
                    printful_id
                }
            })

            const createdVariants = await strapi.service('api::variant.variant').createPrintfulVariants({
                product: createdProduct.id,
                sizes,
                colors,
                variants
            })

            return {
                variants: createdVariants,
                product: createdProduct
            }
        },

        async syncPrintfulMarket() {
            let printful
            await strapi.db.query('api::product.product').deleteMany()
            await strapi.db.query('api::variant.variant').deleteMany()
            try {
                printful = await getAllProductsDetails()
            } catch (e) {
                console.log(e)
                return 'Printful Data Error'
            }

            const colorResults = await strapi.service('api::color.color').bulkFinAndCreateIfNotExist({ values: printful.colors })
            const sizeResults = await strapi.service('api::size.size').bulkFinAndCreateIfNotExist({ values: printful.sizes })

            printful.variants.forEach(async (product) => {
                const colors = colorResults.filter((color) => {
                    return product.colors.includes(color.value)
                })

                const sizes = sizeResults.filter((size) => {
                    return product.sizes.includes(size.value)
                })

                await strapi
                    .service('api::product.product')
                    .createPrintfulProduct({ ...product, product: product, sizes, colors })
                    .then((d) => {
                        // console.log('✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅', product.name, 'created')
                    })
                    .catch((e) => {
                        console.log('❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌', product.name, e)
                    })
            })
            return printful
        },

        async createSyncProduct({ name, price, sizes, colors, description, image, printful_id }: Product) {
            const colorResults = await strapi.service('api::color.color').bulkFinAndCreateIfNotExist({ values: colors })
            const colorIds = colorResults.map((color) => {
                return color.id
            })

            const sizeResults = await strapi.service('api::size.size').bulkFinAndCreateIfNotExist({ values: sizes })
            const sizeIds = sizeResults.map((size) => {
                return size.id
            })

            const product = await strapi.entityService.create('api::product.product', {
                data: {
                    name,
                    price,
                    description,
                    image,
                    colors: colorIds,
                    sizes: sizeIds,
                    printful_id
                }
            })

            const variants = await strapi.service('api::variant.variant').createVariants({
                product: product,
                sizes: sizeIds,
                colors: colorIds
            })

            return {
                product,
                variants
            }
        },

        async search({ name }) {
            return await strapi.entityService.findMany('api::product.product', {
                filters: {
                    name: {
                        $containsi: name
                    }
                }
            })
        }
    }
}

export default factories.createCoreService('api::product.product', services)

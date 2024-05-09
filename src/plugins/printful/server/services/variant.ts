import { Strapi } from '@strapi/strapi'

import { getVariants } from '../api/variant'

import { getUniqueSizesAndColors, Item } from '../api/helper'

function isInside(targetProduct: Item, products: Item[]): boolean {
    return !!products.find((product) => {
        return targetProduct.printful_id === product.printful_id
    })
}

function syncInfoProducts(printfulProducts: Item[], localProducts: Item[]) {
    return {
        delete: localProducts.filter((localProduct) => {
            return !isInside(localProduct, printfulProducts)
        }),

        sync: printfulProducts.filter((printfulProduct) => {
            return !isInside(printfulProduct, localProducts)
        })
    }
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllVariantsForAllProducts() {
        const [printfulProducts, localProducts] = (await Promise.all([
            strapi.plugin('printful').service('product').getAllProducts(),
            strapi.entityService?.findMany('api::product.product')
        ])) as Item[][]

        const info = syncInfoProducts(printfulProducts, localProducts)
        // return info
        return await Promise.all([
            Promise.all(
                info.delete.map((item: any) =>
                    strapi.db?.query('api::product.product')?.delete({
                        where: {
                            printful_id: item.printful_id
                        }
                    })
                )
            ),
            Promise.all(
                info.sync.map(async (item: any) => {
                    const variants = await strapi.plugin('printful').service('variant').getVariantsForSingleProduct(item.printful_id)
                    const printfulProduct = { ...variants, product: { ...item, price: variants.variants[0].price } }
                    return printfulProduct
                    // return strapi.service('api::product.product').createPrintfulProduct(printfulProduct)
                })
            )
        ])
    },

    async getVariantsForSingleProduct(printful_id) {
        const result = await getVariants(printful_id)

        const variants = result.sync_variants.map((variant) => {
            return {
                price: Number(variant.retail_price),
                image: variant.files.find((item) => {
                    return item.type === 'preview'
                }).preview_url,
                size: String(variant.size),
                color: String(variant.color),
                printful_id: variant.id
            }
        })

        return {
            variants,
            ...getUniqueSizesAndColors(variants)
        }
    }
})

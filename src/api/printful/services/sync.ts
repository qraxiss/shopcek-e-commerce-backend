import { Strapi } from '@strapi/strapi'

import { getUniqueSizesAndColors, syncInfo } from '../helpers'

import { PRODUCT, VARIANT } from '../types'

import { setOptions } from '../slices/options'
import { store } from '../store'

const marketOptions = (market) => {
    const variants = marketVariants(market)
    return getUniqueSizesAndColors(variants)
}

const marketVariants = (market) => {
    let variants: any[] = []
    for (let index = 0; index < market.length; index++) {
        const product = market[index]
        variants = [...variants, ...product.variants]
    }

    return variants
}

function getOptions() {
    const {
        options: { data: options }
    } = store.getState()

    return options
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllMarketData() {
        const printfulProducts = await strapi.service('api::printful.api').getAllProductsFromActiveMarket()
        const printfulMarket: any[] = []
        const promises: any[] = []
        for (let index = 0; index < printfulProducts.length; index++) {
            const { printful_id, image, name } = printfulProducts[index]

            const promise = strapi.service('api::printful.product').getPrintfulFullProduct(printful_id)

            promise.then((data) => {
                printfulMarket.push({ printful_id, image, name, ...data })
            })
            promises.push(promise)
            /* printful api limits 120 request per minute, 
            so we send 2 request for each product. */
            if ((index + 1) % 55 === 0) {
                console.log('waiting 60 seconds.')
                await new Promise((r) => setTimeout(r, 60000))
            }
        }
        await Promise.all(promises)
        return printfulMarket
    },

    async createSyncProducts(products: PRODUCT[]) {
        const syncProducts = await strapi.db?.query('api::printful.printful-product').findMany()

        const { sync } = syncInfo(products, syncProducts!)

        return await Promise.all(sync.map((product) => strapi.service('api::printful.sync').createSyncProduct(product)))
    },

    async createSyncProduct(product: PRODUCT) {
        const options = getOptions()
        const colors = product.colors.map(({ hex }) => {
            return options.colors.find(({ hex: optionHex }) => {
                return optionHex === hex
            })
        })
        const sizes = product.sizes.map((size) => {
            return options.sizes.find(({ value: optionSize }) => {
                return size === optionSize
            })
        })

        const localProduct = await strapi.db?.query('api::printful.printful-product').create({
            data: {
                ...product,
                variants: undefined,
                sizes: {
                    connect: sizes.map((size) => size!.id)
                },
                colors: {
                    connect: colors.map((color) => color!.id)
                }
            }
        })

        const variants = await strapi.service('api::printful.sync').createSyncVariants(product.variants, localProduct.id)

        return { ...localProduct, variants }
    },

    async createSyncVariants(variants: VARIANT[], productId) {
        const syncVariants = await strapi.db?.query('api::printful.printful-variant').findMany({
            where: {
                printful_id: variants.map((variant) => String(variant.printful_id))
            }
        })
        const { sync } = syncInfo(variants, syncVariants!)

        return await Promise.all(sync.map((variant) => strapi.service('api::printful.sync').createSyncVariant(variant, productId)))
    },

    async createSyncVariant(variant: VARIANT, productId) {
        const options = getOptions()

        return strapi.db?.query('api::printful.printful-variant').create({
            data: {
                ...variant,
                product: productId,
                color: options.colors.find((color) => variant.color.hex === color.hex)!.id,
                size: options.sizes.find((size) => variant.size === size.value)!.id
            }
        })
    },

    async sync() {
        await strapi.db?.query('api::printful.printful-product').deleteMany()
        await strapi.db?.query('api::printful.printful-variant').deleteMany()
        await strapi.db?.query('api::printful.printful-size').deleteMany()
        await strapi.db?.query('api::printful.printful-color').deleteMany()
        const market = await strapi.service('api::printful.sync').getAllMarketData()
        store.dispatch(setOptions({ options: await strapi.service('api::printful.sync').syncOptions(market) }))
        return await strapi.service('api::printful.sync').createSyncProducts(market)
    },

    async syncOptions(market) {
        const printfulOptions = marketOptions(market)

        const localOptions = {
            sizes: (await strapi.service('api::printful.size').getAll()).map((size) => size.value) as any[],
            colors: (await strapi.service('api::printful.color').getAll()).map((color) => ({ name: color.name, hex: color.hex })) as any[]
        }

        // size
        const sizes: any[] = []
        printfulOptions.sizes.map((size) => {
            if (
                !localOptions.sizes.find((localSize) => {
                    return localSize === size
                })
            ) {
                sizes.push({ value: size })
            }
        })

        if (sizes.length > 0) {
            await strapi.db?.query('api::printful.printful-size').createMany({
                data: sizes
            })
        }

        // color
        const colors: any[] = []
        printfulOptions.colors.map((color) => {
            if (
                !localOptions.colors.find((localColor) => {
                    return color.hex === localColor.hex
                })
            ) {
                colors.push(color)
            }
        })
        if (colors.length > 0) {
            await strapi.db?.query('api::printful.printful-color').createMany({
                data: colors
            })
        }

        return {
            sizes: await strapi.service('api::printful.size').getAll(),
            colors: await strapi.service('api::printful.color').getAll()
        }
    }
})

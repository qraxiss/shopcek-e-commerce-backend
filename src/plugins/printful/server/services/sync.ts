import { Strapi } from '@strapi/strapi'

import { getUniqueSizesAndColors } from '../helpers/logic'

import market from './market.json'

const marketOptions = (market) => {
    let variants: any[] = []
    for (let index = 0; index < market.length; index++) {
        const product = market[index]
        variants = [...variants, ...product.variants]
    }

    return getUniqueSizesAndColors(variants)
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async getAllMarketData() {
        const printfulProducts = await strapi.plugin('printful').service('api').getAllProductsFromActiveMarket()
        const printfulMarket: any[] = []
        const promises: any[] = []
        for (let index = 0; index < printfulProducts.length; index++) {
            const { printful_id, image, name } = printfulProducts[index]

            const promise = strapi.plugin('printful').service('product').getPrintfulFullProduct(printful_id)

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

    async syncOptions() {
        const printfulOptions = marketOptions(market)

        const localOptions = {
            sizes: (await strapi.plugin('printful').service('size').getAll()).map((size) => size.value) as any[],
            colors: (await strapi.plugin('printful').service('color').getAll()).map((color) => ({ name: color.name, hex: color.hex })) as any[]
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
            await strapi.db?.query('plugin::printful.printful-size').createMany({
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
            await strapi.db?.query('plugin::printful.printful-color').createMany({
                data: colors
            })
        }

        return {
            sizes: await strapi.plugin('printful').service('size').getAll(),
            colors: await strapi.plugin('printful').service('color').getAll()
        }
    }
})

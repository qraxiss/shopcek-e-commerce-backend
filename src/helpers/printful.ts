import axios from 'axios'
import { config } from 'dotenv'

config()

export let printfulClient = axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
    },
    withCredentials: true
})
interface Item {
    price: string
    image: string
    size: string
    color: string
    printful_id?: string | number
}

// Function to get unique sizes and colors

const allUniqueSizes: string[] = []
const allUniqueColors: string[] = []
const getUniqueSizesAndColors = (items: Item[]) => {
    const uniqueSizes: string[] = []
    const uniqueColors: string[] = []

    items.forEach((item) => {
        if (!uniqueSizes.includes(item.size)) {
            uniqueSizes.push(item.size)
        }

        if (!uniqueColors.includes(item.color)) {
            uniqueColors.push(item.color)
        }
        if (!allUniqueSizes.includes(item.size)) {
            allUniqueSizes.push(item.size)
        }

        if (!allUniqueColors.includes(item.color)) {
            allUniqueColors.push(item.color)
        }
    })

    return { sizes: uniqueSizes, colors: uniqueColors }
}

export function printfulRequestWrapper({ data }) {
    return data.result
}

export async function getAllProducts() {
    let data = printfulRequestWrapper(
        await printfulClient.get('/store/products', {
            params: {
                status: 'all',
                limit: 100
            }
        })
    )

    const localProducts = await strapi.db.query('api::product.product').findMany()
    const products = data.map((item) => {
        return {
            printful_id: item.id,
            name: item.name,
            image: item.thumbnail_url
        }
    })
    return products.filter((product) => {
        return !localProducts.find((localProduct) => {
            return Number(product.printful_id) === Number(localProduct.printful_id)
        })
    })
}

export async function getVariants({ printful_id }) {
    let data = printfulRequestWrapper(await printfulClient.get(`/store/products/${printful_id}`))

    data = data.sync_variants.map((variant) => {
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

    data = {
        variants: data,
        ...getUniqueSizesAndColors(data)
    }

    return data
}

export async function getVariant({ printful_id }) {
    let data = printfulRequestWrapper(await printfulClient.get(`/store/variants/${printful_id}`))

    return data
}

export async function getAllProductsDetails() {
    const data = await getAllProducts()

    const allVariants = Promise.all(
        data.map(async (item) => {
            let variantsPromise = getVariants(item)
            variantsPromise.catch((e) => {
                console.error(e)
            })
            const variants = await variantsPromise
            const localVariants = await strapi.entityService.findMany('api::printful.printful-variant', {
                filters: {
                    printful_id: {
                        $in: variants.variants.map((variant) => variant.printful_id)
                    }
                },
                populate: {
                    product: true
                }
            })

            variants.variants = variants.variants.filter((variant) => {
                return !localVariants.find((localVariant) => {
                    return Number(variant.printful_id) === Number(localVariant.printful_id)
                })
            })

            localVariants
                .filter((localVariant) => {
                    return !localVariant.product
                })
                .forEach((variant) => {
                    strapi.db.query('api::variant.variant').update({
                        where: {
                            printful_id: variant.printful_id
                        },
                        data: {
                            product: variant.id
                        }
                    })
                })

            await strapi.db.query('api::product.product').update({
                where: {
                    printful_id: item.printful_id
                },
                data: {
                    variants: {
                        connect: localVariants
                            .filter((localVariant) => {
                                return !localVariant.product
                            })
                            .map((localVariant) => localVariant.id)
                    }
                },
                populate: {
                    variants: '*'
                }
            })

            return {
                ...item,
                price: variants.variants[0]?.price || localVariants[0]?.price,
                ...variants
            }
        })
    )
    const result = { variants: await allVariants, sizes: allUniqueSizes, colors: allUniqueColors }
    return result
}

export async function newOrderPrintful({ recipient, items, shipping }) {
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        item.files = item.files.filter((file) => {
            return file.type !== 'label_inside'
        })

        item.options = item.options.map((option) => {
            return {
                ...option,
                value: Array.isArray(option.value)
                    ? option.value.map((item) => {
                          try {
                              item = item.toUpperCase()
                          } catch {}
                          return item
                      })
                    : option.value
            }
        })
    }

    let data = printfulRequestWrapper(
        await printfulClient.post(`/orders`, {
            items,
            recipient,
            shipping,
            packing_slip: {
                email: 'info@shopcek.com',
                message: 'iLoveCrypto',
                store_name: 'Shopcek'
            }
        })
    )

    return data
}

export async function shippingRates({ recipient, items }) {
    return printfulRequestWrapper(
        await printfulClient.post('/shipping/rates', {
            items,
            recipient
        })
    )
}

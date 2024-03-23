import axios from 'axios'
import { config } from 'dotenv'

config()

export let printfulClient = axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
    }
})
interface Item {
    price: string
    image: string
    size: string
    color: string
}

// Function to get unique sizes and colors
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
                status: 'all'
            }
        })
    )

    return data.map((item) => {
        return {
            printful_id: item.id,
            name: item.name,
            image: item.thumbnail_url
        }
    })
}

export async function getVariants({ printful_id }) {
    let data = printfulRequestWrapper(await printfulClient.get(`/store/products/${printful_id}`))

    data = data.sync_variants.map((variant) => {
        return {
            price: Number(variant.retail_price),
            image: variant.files[1].preview_url,
            size: variant.size,
            color: variant.color,
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
    let data = await getAllProducts()
    return await Promise.all(
        data.map(async (item) => {
            let variants = await getVariants(item)
            return {
                ...item,
                price: variants.variants[0].price,
                ...variants
            }
        })
    )
}


export async function newOrderPrintful({ recipient, items }) {
    let data = printfulRequestWrapper(
        await printfulClient.post(`/orders`, {
            items,
            recipient,
            packing_slip: {
                email: 'info@shopcek.com',
                message: 'iLoveCrypto',
                store_name: 'Shopcek'
            }
        })
    )

    return data
}
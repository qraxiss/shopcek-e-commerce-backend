import client from './client'

export async function getVariant(printful_id) {
    return (await client.get(`/store/variants/${printful_id}`)).data.result
}

export async function getVariants(printful_id) {
    return (await client.get(`/store/products/${printful_id}`)).data.result
}

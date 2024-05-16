import client from './client'

export async function getAllProducts() {
    return (
        await client.get('/store/products', {
            params: {
                status: 'all',
                limit: 100
            }
        })
    ).data.result
}

export async function getProduct(product_id) {
    return (await client.get(`/products/${product_id}`)).data.result
}

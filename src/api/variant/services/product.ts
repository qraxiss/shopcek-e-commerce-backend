// /**
//  * product service
//  */

// import { factories, Strapi } from '@strapi/strapi'
// import { getAllProductsDetails } from '../../../helpers/printful'

// interface Product {
//     name: string
//     price: number
//     sizes: string[]
//     colors: string[]
//     image?: string
//     description?: string | undefined
// }

// interface PrintfulProduct extends Product {
//     printful_id: number
// }

// function services({ strapi: Strapi }) {
//     return {
//         async createPrintfulProduct({ printful_id, variants, product }: { printful_id: number; variants: any[]; product: PrintfulProduct }) {
//             const createdProduct = await strapi.service('api::product.product').createSyncProduct(product)
//             const productUpdateResult = await strapi.entityService.update('api::product.product', createdProduct.product.id, {
//                 data: {
//                     printful_id
//                 }
//             })

//             const updateVariantsData = (
//                 variants.map(async (printfulVariant) => {
//                     const { id } = createdProduct.variants.find((localVariant) => {
//                         return localVariant.size.value === printfulVariant.size && localVariant.color.value === printfulVariant.color
//                     })

//                     return await strapi.entityService.update('api::variant.variant', id, {
//                         data: {
//                             image: printfulVariant.image,
//                             printful_id: printfulVariant.printful_id,
//                             price: printfulVariant.price
//                         }
//                     })
//                 })
//             )

//             return updateVariantsData
//         },

//         async syncPrintfulMarket(){
//             const products = await getAllProductsDetails()
//             const result = []
//             for (let index = 0; index < products.length; index++) {
//                 const product = products[index];
//                 result.push(await strapi.service('api::product.product').createPrintfulProduct({...product, product: product}))
//             }

//             return result
//         },

//         async createSyncProduct({ name, price, sizes, colors, description, image }: Product) {
//             const colorResults = await strapi.service('api::color.color').bulkFinAndCreateIfNotExist({ values: colors })
//             const colorIds = colorResults.map((color) => {
//                 return color.id
//             })

//             const sizeResults = await strapi.service('api::size.size').bulkFinAndCreateIfNotExist({ values: sizes })
//             const sizeIds = sizeResults.map((size) => {
//                 return size.id
//             })

//             const product = await strapi.entityService.create('api::product.product', {
//                 data: {
//                     name,
//                     price,
//                     description,
//                     image,
//                     colors: colorIds,
//                     sizes: sizeIds
//                 }
//             })

//             return {
//                 product,
//                 variants: await strapi.service('api::variant.variant').createVariants({
//                     product: product.id,
//                     sizes: sizeIds,
//                     colors: colorIds
//                 })
//             }
//         }
//     }
// }

// export default factories.createCoreService('api::product.product', services)

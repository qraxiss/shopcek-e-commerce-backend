import { VARIANT, COLOR, SIZE } from './variant'

export type PRODUCT = {
    printful_id: number
    image: string
    name: string
    product_id: number
    description: number
    variants: VARIANT[]
    colors: COLOR[]
    sizes: SIZE[]
}

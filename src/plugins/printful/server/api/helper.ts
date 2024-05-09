export interface Item {
    price: string
    image: string
    size: string
    color: string
    printful_id?: string | number
}

// Function to get unique sizes and colors

export const allUniqueSizes: string[] = []
export const allUniqueColors: string[] = []
export const getUniqueSizesAndColors = (items: Item[], sizes: any = allUniqueSizes, colors: any = allUniqueColors) => {
    const uniqueSizes: string[] = []
    const uniqueColors: string[] = []

    items.forEach((item) => {
        if (!uniqueSizes.includes(item.size)) {
            uniqueSizes.push(item.size)
        }

        if (!uniqueColors.includes(item.color)) {
            uniqueColors.push(item.color)
        }
        if (!sizes.includes(item.size)) {
            sizes.push(item.size)
        }

        if (!colors.includes(item.color)) {
            colors.push(item.color)
        }
    })

    return { sizes: uniqueSizes, colors: uniqueColors }
}

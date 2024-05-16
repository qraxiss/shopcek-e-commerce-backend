export function isInside(targetProduct: any, products: any[]): boolean {
    return !!products.find((product) => {
        return targetProduct.printful_id === product.printful_id
    })
}

export function syncInfoProducts(printfulProducts: any[], localProducts: any[]) {
    return {
        delete: localProducts.filter((localProduct) => {
            return !isInside(localProduct, printfulProducts)
        }),

        sync: printfulProducts.filter((printfulProduct) => {
            return !isInside(printfulProduct, localProducts)
        })
    }
}

export function getUniqueSizesAndColors(anys: any[]) {
    const uniqueSizes: string[] = []
    const uniqueColors: any[] = []

    anys.forEach((any) => {
        if (!uniqueSizes.includes(any.size)) {
            uniqueSizes.push(any.size)
        }

        if (
            !uniqueColors.find((color) => {
                return any.color.hex === color.hex
            })
        ) {
            uniqueColors.push(any.color)
        }
    })

    return { sizes: uniqueSizes, colors: uniqueColors }
}

export function mergeVariantData(variantsDataP1: any[], variantsDataP2: any[]) {
    return variantsDataP1.map((variantP1) => {
        const variantP2 = variantsDataP2.find((variantP2) => variantP1.variant_id === variantP2.variant_id)

        return {
            ...variantP1,
            ...variantP2
        }
    })
}

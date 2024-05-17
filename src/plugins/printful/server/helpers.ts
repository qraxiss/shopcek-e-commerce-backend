export function isInside(target: any, products: any[]): boolean {
    return !!products.find((product) => {
        return Number(target.printful_id) === Number(product.printful_id)
    })
}

export function syncInfo(printful: any[], local: any[]): { sync: any[]; remove: any[] } {
    return {
        remove: local.filter((localProduct) => {
            return !isInside(localProduct, printful)
        }),

        sync: printful.filter((printfulProduct) => {
            return !isInside(printfulProduct, local)
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
    const variants = variantsDataP1.map((variantP1) => {
        const variantP2 = variantsDataP2.find((variantP2) => variantP1.variant_id === variantP2.variant_id)
        const variant = {
            ...variantP1,
            ...variantP2
        }

        return variant
    })

    return variants
}

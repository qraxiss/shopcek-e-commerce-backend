export default `
    type VariantId {
        variant: Variant
        id: ID
    }


    type ProductDetails {
        product: Product
        variants: [VariantId]
    }

    type Query {
        product(slug: String!): ProductDetails
        search(name: String!): [Product]
    }
`

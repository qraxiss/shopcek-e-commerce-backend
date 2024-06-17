export default `
    type VariantId {
        variant: PrintfulVariant
        id: ID
    }


    type ProductDetails {
        product: PrintfulProduct
        variants: [VariantId]
    }

    type Query {
        product(slug: String!): ProductDetails
        search(name: String!): [PrintfulProduct]
    }
`

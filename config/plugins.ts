export default {
    user: {
        enabled: true,
        resolve: './src/plugins/user'
    },
    printful: {
        enabled: false,
        resolve: './src/plugins/printful'
    },
    graphql: {
        config: {
            // endpoint: '/graphql',
            // shadowCRUD: true,
            // playgroundAlways: false,
            depthLimit: 50,
            amountLimit: 1000,
            // apolloServer: {
            //     tracing: false
            // }
            maxLimit: 50
        }
    }
}

export default {
    user: {
        enabled: true,
        resolve: './src/plugins/user'
    },
    graphql: {
        config: {
            // endpoint: '/graphql',
            // shadowCRUD: true,
            // playgroundAlways: false,
            // depthLimit: 50,
            // amountLimit: 1000,
            // apolloServer: {
            //     tracing: false
            // }
            maxLimit: 50
        }
    }
}

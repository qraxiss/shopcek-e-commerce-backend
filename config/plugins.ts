export default {
    user: {
        enabled: true,
        resolve: './src/plugins/user'
    },
    // 'video-thumbnail': {
    //     enabled: true,
    //     resolve: './src/plugins/strapi-plugin-video-thumbnail' // path to plugin folder
    //   },
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

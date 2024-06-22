export default {
    routes: [
        {
            method: 'POST',
            path: '/printful',
            handler: 'printful.exampleAction',
            config: {
                policies: [],
                middlewares: []
            }
        }
    ]
}

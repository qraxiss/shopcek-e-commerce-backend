export default ({ env }) => ({
    settings: {
        session: {
            enabled: true,
            client: 'cookie',
            key: 'strapi.sid',
            prefix: 'strapi:sess:',
            secretKeys: env.array('APP_KEYS'),
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            overwrite: true,
            signed: false,
            rolling: false
        },
        cookieParser: {
            enabled: true
        }
    }
})

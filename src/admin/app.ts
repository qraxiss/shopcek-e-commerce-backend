import logo from './extensions/logo.png'

const config = {
    tutorials: false,
    locales: ['tr', 'en'],
    notifications: { releases: false },
    head: {
        favicon: logo
    },
    auth: {
        logo: logo
    },
    menu: {
        logo: logo
    }
}

export default {
    config,
    bootstrap(app: any) {},
    register(app: any) {}
}

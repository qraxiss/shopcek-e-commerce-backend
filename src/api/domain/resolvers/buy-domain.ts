export async function buyDomain({ username, transaction }) {
    if (!transaction){
        throw new Error('transaction not valid')
    }

    return !!(await strapi.entityService.create('api::domain.domain', {
        data: {
            username
        }
    }))
}

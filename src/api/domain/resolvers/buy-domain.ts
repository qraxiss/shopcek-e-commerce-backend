export async function buyDomain(obj, { username, transaction }, context) {
    if (!transaction) {
        throw new Error('transaction not valid')
    }

    return !!(await strapi.entityService.create('api::domain.domain', {
        data: {
            username,
            user: context.state.user.id
        }
    }))
}

export async function checkDomain(obj, { username }, context: { username: string }) {
    const domain = await strapi.db.query('api::domain.domain').findOne({
        where: {
            username
        }
    })

    return !domain
}

export async function checkDomain({ username }: { username: string }) {
    const domain = await strapi.db.query('api::domain.domain').findOne({
        where: {
            username
        }
    })

    return !!domain
}

export async function choose(obj, { username }, context) {
    const domain = await strapi.db.query('api::domain.domain').findOne({
        where: {
            username
        }
    })

    return await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: context.state.user.id
        },
        data: {
            choosen: domain.id
        }
    })
}

export async function choosen(obj, args, context) {
    return (await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            choosen: '*'
        }
    })).choosen
}

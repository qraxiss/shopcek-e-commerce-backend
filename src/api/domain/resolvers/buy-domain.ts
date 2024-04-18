export async function buyDomain(obj, { username, transaction }, context) {
    if (!transaction) {
        throw new Error('transaction not valid')
    }

    try {
        const earn = await strapi.db.query('api::earn.earn').findOne({
            where: {
                user: strapi.requestContext.get().state.user.id
            },
            populate: {
                xp: '*'
            }
        })

        let reward
        if (username.length >= 3 && username.length <= 4) {
            reward = 3000
        } else if (username.length >= 5 && username.length <= 7) {
            reward = 4500
        } else if (username.length >= 8 && username.length <= 15) {
            reward = 6000
        }

        const update = await strapi.db.query('api::earn.earn').update({
            where: {
                user: strapi.requestContext.get().state.user.id
            },
            data: {
                xp: earn.xp + reward
            }
        })
    } catch {}

    return await strapi.entityService.create('api::domain.domain', {
        data: {
            username,
            user: context.state.user.id
        }
    })
}

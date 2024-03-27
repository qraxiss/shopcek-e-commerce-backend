function earn() {
    return strapi.service('api::earn.earn')
}

async function earnId(context) {
    const id = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: context.state.user.id
            },
            populate: {
                earn: '*'
            }
        })
    ).earn.id

    return id
}

export async function claim(obj, { service }, context) {
    return await earn().claim({ service, earn: await earnId(context) })
}

export async function getLastClaim(obj, { service }, context) {
    return await earn().getLastClaim({ service, earn: await earnId(context) })
}

export async function getStreak(obj, { service }, context) {
    return await earn().getStreak({ service, earn: await earnId(context) })
}

export async function startSessionTime(obj, args, context) {
    return await earn().startSessionTime({ earn: await earnId(context) })
}

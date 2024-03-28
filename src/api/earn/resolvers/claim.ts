import moment from 'moment'

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
    const result = await earn().claim({ service, earn: await earnId(context) })

    switch (service) {
        case 'login': {
            const streak = await earn().getStreak({ service, earn: await earnId(context) })

            const loginRewards = await strapi.entityService.findOne('api::login-reward.login-reward', 1, {
                populate: {
                    rewards: true
                }
            })

            const xp = loginRewards.rewards[streak].reward as number
            const earnData = await strapi.entityService.findOne('api::earn.earn', (await earnId(context)) as any)
            const update = await strapi.entityService.update('api::earn.earn', (await earnId(context)) as any, {
                data: {
                    xp: earnData.xp + xp
                }
            })

            return result
        }

        case 'stay': {
            const time = {
                '15m': 60 * 15,
                '3h': 60 * 50 * 3,
                '6h': 60 * 60 * 6,
                '10h': 60 * 60 * 10
            }

            const earnData = await strapi.entityService.findOne('api::earn.earn', (await earnId(context)) as any)
            const seconds = moment().diff(moment(earnData.sessionStart), 'seconds')

            console.log(seconds)

            let xp
            if (seconds < time['15m']) {
                xp = 300
            } else if (time['3h'] > seconds && seconds > time['15m']) {
                xp = 15
            } else if (time['6h'] > seconds && seconds > time['3h']) {
                xp = 20
            } else if (time['10h'] > seconds && seconds > time['6h']) {
                xp = 25
            } else if (seconds > time['10h']) {
                xp = 30
            }

            const update = await strapi.entityService.update('api::earn.earn', (await earnId(context)) as any, {
                data: {
                    xp: earnData.xp + xp
                }
            })

            return result
        }
        default: {
            return result
        }
    }
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

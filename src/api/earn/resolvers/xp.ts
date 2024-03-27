export async function xp(obj, args, context) {
    return (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: context.state.user.id
            },

            populate: {
                earn: '*'
            }
        })
    ).earn.xp
}

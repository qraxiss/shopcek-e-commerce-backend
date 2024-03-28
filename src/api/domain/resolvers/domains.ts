export async function domains(obj, args, context){
    return await strapi.db.query('api::domain.domain').findMany({
        filters: {
            user: context.state.user.id
        }
    })
}
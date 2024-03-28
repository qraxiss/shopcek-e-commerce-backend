export async function domains(obj, args, context){
    console.log(context.state.user)
    
    return await strapi.db.query('api::domain.domain').findMany({
        filters: {
            user: context.state.user.id
        }
    })
}
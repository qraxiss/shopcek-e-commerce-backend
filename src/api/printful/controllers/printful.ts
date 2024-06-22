/**
 * A set of functions called "actions" for `printful`
 */

export default {
    exampleAction: async (ctx, next) => {
        console.log(ctx.session, ctx.state.user)
        ctx.session = ctx.state.user

        try {
            ctx.body = 'ok'
        } catch (err) {
            ctx.body = err
        }
    }
}

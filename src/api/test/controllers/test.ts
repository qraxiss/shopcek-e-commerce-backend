/**
 * A set of functions called "actions" for `test`
 */

export default {
    exampleAction: async (ctx, next) => {
        try {
            ctx.body = ctx.request.headers
        } catch (err) {
            ctx.body = err
        }
    }
}

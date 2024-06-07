export async function shippingRates(obj, args, context) {
    return strapi.service('api::cart.cart').shippingRates({ userId: context.state.user.id })
}

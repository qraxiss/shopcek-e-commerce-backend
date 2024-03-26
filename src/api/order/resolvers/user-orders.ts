export async function getOrders(obj, args, context) {
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: context.state.user.id
        },
        populate: {
            orders: '*'
        }
    })

    const orders = await strapi.entityService.findMany('api::order.order', {
        filters: {
            id: {
                $in: user.orders.map((order) => order.id)
            }
        },
        populate: {
            printful_order: true,
            cart: true
        }
    })

    

    return orders.map(order=>({
        id: order.id,
        count: order.cart.count,
        price: order.cart.price,
        createdAt: order.createdAt,
        error: order.printful_order.error,
    }))
}

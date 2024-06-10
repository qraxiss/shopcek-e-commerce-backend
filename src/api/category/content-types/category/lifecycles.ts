import { slugGen } from '../../../../helpers/slug'

export default {
    async beforeCreate(event: any) {
        event.params.data.slug = slugGen(event.params.data.name)
    }
}

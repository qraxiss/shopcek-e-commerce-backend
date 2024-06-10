import slugify from 'slugify'

export default {
    async beforeCreate(event: any) {
        event.params.data.slug = slugify(event.params.data.name, { lower: true })
    }
}

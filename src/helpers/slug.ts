import randomstring from 'randomstring'
import slugify from 'slugify'

export function slugGen(name: string) {
    return `${slugify(name, {
        lower: true
    })}-${randomstring.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization: 'lowercase'
    })}`
}

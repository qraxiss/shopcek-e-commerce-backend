import randomstring from 'randomstring'
import slugify from 'slugify'

export function slugGen(name: string, randomize = true) {
    if (!randomize) {
        return slugify(name, { lower: true })
    }

    return `${slugify(name, {
        lower: true
    })}-${randomstring.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization: 'lowercase'
    })}`
}

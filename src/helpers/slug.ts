import randomstring from 'randomstring'
import slugify from 'slugify'

export function slugGen(name: string, randomize = true) {
    return `${slugify(name, {
        lower: true
    })}${
        randomize
            ? `-${randomstring.generate({
                  length: 5,
                  charset: 'alphabetic',
                  capitalization: 'lowercase'
              })}`
            : ''
    }`
}

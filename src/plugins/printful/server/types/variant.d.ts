export type STATUS = {
    region: string
    status: string
}

export type COLOR = {
    hex: string
    name: string
}

export type SIZE = string

export type VARIANT = {
    image: string
    printful_id: number
    variant_id: number
    color: COLOR
    size: SIZE
    status: STATUS[]
}

export type OPTIONS = {
    colors: COLOR[]
    sizes: SIZE[]
}

export type OPTIONS_DB = {
    sizes: { value: string; id: number }[]
    colors: { name: string; id: number; hex: string }[]
}

export type OPTION = {
    color: COLOR
    size: SIZE
}

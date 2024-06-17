import { createSlice } from '@reduxjs/toolkit'

import { OPTIONS_DB } from '../types'

const initialState: {
    data: OPTIONS_DB
} = {
    data: {
        colors: [],
        sizes: []
    }
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptions(state, { payload: { options } }) {
            state.data = options
        }
    }
})

export const { setOptions } = optionsSlice.actions

export default optionsSlice.reducer

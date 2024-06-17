import { combineReducers } from '@reduxjs/toolkit'

import OptionsReducer from './options'

export default combineReducers({
    options: OptionsReducer
})

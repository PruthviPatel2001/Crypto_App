import {combineReducers} from 'redux'
import marketReducer from './market/marketReducer'
import tabReducer from './tab/tabReducers'

export default combineReducers ({
    tabReducer,
    marketReducer
})
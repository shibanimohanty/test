import { combineReducers } from 'redux';
import CategoryListReducer from './categoryList.reducer';
import BellRingReducer from './bellring.reducer';

export default combineReducers({
    CategoryListReducer,
    BellRingReducer
})
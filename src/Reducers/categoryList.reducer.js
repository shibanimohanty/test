import { REDUCER } from '../Constants/Reducer';
import { data } from '../Constants/data';

const CategoryListReducer = (state = {
    categoryList: [],
    itemList: [],
    itemDetails: {},
    cartList: [],
    searchText: '',
    searchIcon: [],
    searchResult: [],
    globalSearch: false,
    categoryName: '',
    userId: '43d2c0c2-60cd-40c0-85c4-326b6ea746a6',
    tableName: 'FIR',
}, action) => {
    switch (action.type) {
        case REDUCER.GET_ALL_CATEGORYLIST:
            return {
                ...state,
                categoryList: action.categoryList
            }
        case REDUCER.GET_ALL_LIST_ITEMS:
            return {
                ...state,
                itemList: action.itemList,
                categoryName: action.categoryName
            }
        case REDUCER.GET_ITEM_DETAILS:
            return {
                ...state,
                itemDetails: action.itemDetails
            }
        case REDUCER.UPDATE_BUY_LIST_ITEMS:
            return {
                ...state,
                cartList: action.cartList
            }
        case REDUCER.UPDATE_SEARCH_ITEMS: 
            return{
                ...state,
                searchText: action.searchText,
                searchIcon: action.searchIcon,
                searchResult: action.searchResult,
                globalSearch: action.globalSearch,
                itemList: action.itemList
            } 

        case REDUCER.UPDATE_SEARCH_ICONS: 
            return {
                ...state,
                searchIcon: action.searchIcon,
            }
        case REDUCER.USER_DATA:
            return {
                ...state,
                userId: action.userId,
                tableName: action.tableName
            }
        case REDUCER.USER_CHECKIN:
            return {
                ...state,
                userDetails: action.userDetails,
            } 
        case REDUCER.UPDATE_ORDER_INVOICE:
            return {
                ...state,
                invoice: action.invoice,
                cartList: []
            }
        default:
            return state;
    }
}

export default CategoryListReducer;
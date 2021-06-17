import axios from '../Helpers/axiosInstance';
import urlGenerator from '../Helpers/urlGenerators';
import { API } from "aws-amplify";
import { baseCommonUrl, URLS } from '../Constants/UrlConstant';
import { REDUCER } from '../Constants/Reducer';
import { store } from '../Store/index';
import { Validation } from 'src/Constants/constants';
import awsRequestInterceptor from 'src/Helpers/awsRequestIntercepter';

import * as mutations from "../graphQL/mutations";

const getAllCategoryList = () => {
    // let url = urlGenerator(baseCommonUrl, URLS.GetAllActiveDiscounts);
    let url = "https://cqvd1x2h5c.execute-api.eu-west-1.amazonaws.com/DEV/menu/43d2c0c2-60cd-40c0-85c4-326b6ea746a6";
    return (dispatch) => {
        return axios.get(url)
            .then(data => { 
                console.log("data", data)
                dispatch({
                    type: REDUCER.GET_ALL_CATEGORYLIST,
                    categoryList: data.data.Items
                })
            })
    }
}

const getUserDetails = (urlData) => {
    return dispatch => {
        dispatch({
            type: REDUCER.USER_DATA,
            userId: urlData.userId,
            tableName: urlData.tableName
        })
    }
}

const getItemList = (categoryId) => {
    return dispatch => {
        let categoryList = store.getState().CategoryListReducer.categoryList;
        let category = categoryList.filter(cat => cat.categoryId == categoryId)[0];
        let productList = category ? category.products : [];
        dispatch({
            type: REDUCER.GET_ALL_LIST_ITEMS,
            itemList: productList && productList.length > 0 ? [...productList] : [],
            categoryName: !!category && category.categoryName
        })
    }
}

const getItemDetails = (itemId) => {
    return dispatch => {
        let itemList = store.getState().CategoryListReducer.itemList;
        let searchResult = store.getState().CategoryListReducer.searchResult;
        let searchList = [...itemList];
        if(itemList.length == 0){
            searchList = [...searchResult];
        }
        let item = searchList.filter(it => it.id == itemId)[0];
        dispatch({
            type: REDUCER.GET_ITEM_DETAILS,
            itemDetails: item ? { ...item } : {}
        })
    }
}

const getItemDetailsFromTotalList = (item) => {
    return dispatch => {
        let categoryList = store.getState().CategoryListReducer.categoryList;
        let category = categoryList.filter(cat => cat.categoryId == item.categoryId)[0];
        let productList = category ? category.products : [];
        let itemDetails = productList.filter(it => it.id == item.id)[0];
        console.log("detial", categoryList, category, productList, itemDetails)
        dispatch({
            type: REDUCER.GET_ITEM_DETAILS,
            itemDetails: itemDetails ? { ...itemDetails } : {}
        })
    }
}

const updateCart = (item, itemId, type) => {
    return dispatch => {
        let cartList = store.getState().CategoryListReducer.cartList;
        let itemExist, itemIndex;
        cartList.map((cart, index) => {
            if (cart.id == item.id) {
                itemIndex = index;
                itemExist = cart;
            }
        });
        if (itemExist && itemExist.id ) {
            if( type === 'add' && itemExist.count < 100) {
                itemExist.count =  itemExist.count + 1 ;
            } 
            else if(type === 'remove') {
                itemExist.count = itemExist.count - 1;
            }
            cartList[itemIndex] = { ...itemExist };
        } else {
            cartList.push({
                ...item,
                count: type === 'add' ? 1 : 0
            })
        }
        let updatedCartList = cartList.filter(cart => cart.count > 0);

        dispatch({
            type: REDUCER.UPDATE_BUY_LIST_ITEMS,
            cartList: updatedCartList ? [...updatedCartList] : []
        })
    }
}

const deleteItemFromCart = (itemId) => {

    return dispatch => {
        let cartList = store.getState().CategoryListReducer.cartList;
        let itemExist, itemIndex;
        cartList.map((cart, index) => {
            if (cart.id == itemId) {
                itemIndex = index;
                itemExist = cart;
            }
        });
        let tempCartList = [...cartList];
        if (tempCartList.length == 1) {
            tempCartList = [];
        }
        else if (itemIndex >= 0) {
            tempCartList.splice(itemIndex, 1);
        }
        console.log("sdsd", tempCartList, itemId)
        dispatch({
            type: REDUCER.UPDATE_BUY_LIST_ITEMS,
            cartList: tempCartList ? [...tempCartList] : []
        })
    }
}

const callingWaiter = () => {
    return dispatch => {
         const userId =  store.getState().CategoryListReducer.userId,
            tableName = store.getState().CategoryListReducer.tableName;
        console.log("waiter calling", userId, tableName)
        const mutation = `mutation MyMutation {
            callWaiter(waiterInput: {tableName: "${tableName}", userId: "${userId}", hasCustomerCall: true }) {
              table {
                tableName
                userId
                hasCustomerCall
               }
            }
          }`
        return   API.graphql({
            query: mutation,
          })
        .then(data => {
            dispatch({
                type: REDUCER.UPDATE_WAITER_CALL,
                waiterCalling: true
            })
            return Validation.success
        }).catch(err => {
            console.log("error", err);
            return Validation.error
        })
        
    }
}

// TODO: Handle Errors - possible error could be in case Table name is not valid
const undoCallingWaiter = () => {
    return dispatch => {
    const userId = store.getState().CategoryListReducer.userId,
        tableName = store.getState().CategoryListReducer.tableName;

    const mutation = `mutation MyMutation {
        callWaiter(waiterInput: {tableName: "${tableName}", userId: "${userId}", hasCustomerCall: false  }) {
          table {
            tableName
            userId
            hasCustomerCall
           }
        }
      }`
    return   API.graphql({
        query: mutation,
    })
    .then(data => {
        dispatch({
            type: REDUCER.UPDATE_WAITER_CALL,
            waiterCalling: false
        })
        return Validation.success
    }).catch(err => {
        console.log("error", err);
        return Validation.error
    })
}
}

const cancelSearchText = (iconReset) => {
    return dispatch => {
        dispatch({
            type: REDUCER.UPDATE_SEARCH_ITEMS,
            searchText: '',
            searchIcon: iconReset ? [] : store.getState().CategoryListReducer.searchIcon,
            searchResult: [],
            itemList: [],
            globalSearch: false
        })
    }
}

const updateSearchText = (search, selectedFilter) => {
    return dispatch => {
        search = search.toLowerCase();
        let tempCategoryList = store.getState().CategoryListReducer.categoryList;
        let tempResult = [];
        if (search || selectedFilter.length > 0) {
            let valid = false;
            tempCategoryList.map(category => {
                valid = false;
                if (category.products && category.products.length > 0) {
                    for (let i = 0; i < category.products.length; i++) {
                        if (category.products[i].name.toString().toLowerCase().includes(search.toLowerCase())) {
                            let tempValid = selectedFilter.length > 0 ? false : true;
                            selectedFilter.map(filter => {
                                if (tempValid) {
                                    return;
                                }else{
                                    tempValid = category.products[i].icons.map(icon => icon.id).includes(filter);
                                }
                            })
                            if (tempValid) {
                                tempResult.push(category.products[i])
                            }
                        }
                    }
                }
                
                return category;
            })
            dispatch({
                type: REDUCER.UPDATE_SEARCH_ITEMS,
                searchText: search,
                searchIcon: [...selectedFilter],
                searchResult: [...tempResult],
                itemList: [],
                globalSearch: true
            })
        } 
       
    }
}

const updateIconsInSearch = (icons) => {
    return dispatch => {
        dispatch({
            type: REDUCER.UPDATE_SEARCH_ICONS,
            searchIcon: [...icons],
        })
    }
}

const userCheckin = (userDetails) => {
    return (dispatch) => {
        let payload = {
            ...userDetails,
            userId: store.getState().CategoryListReducer.userId,
            tableName: store.getState().CategoryListReducer.tableName,
            sessionTimestamp: new Date().getTime().toString()
        }
        return API.post("testApi", URLS.UserCheckin, awsRequestInterceptor({body: payload}))
            .then(data => {
                dispatch({
                    type: REDUCER.USER_CHECKIN, 
                    userDetails: {...userDetails}
                })
                return Validation.success;
            })
            .catch(err => {
                console.log("error", err)
                return Validation.error;
            })
    }
}

const createOrder = ({payMethod, wish}) => {

    payMethod = payMethod ? payMethod.toUpperCase() : 'CASH';

    return dispatch => {
        let payload = [];
        let userId = store.getState().CategoryListReducer.userId;
        let tableName = store.getState().CategoryListReducer.tableName;
        let cartList = store.getState().CategoryListReducer.cartList;
        cartList.forEach(item => {
            payload.push({
                price: item.price,
                quantity: item.count,
                finishedItemTs: 1,
                timestampStart: 1,
                productId: item.id,
                productName: item.name,
            })
        });
        
        console.log("payload", payload, JSON.stringify(payload))
        console.log("userId", userId)
        console.log("tableName", tableName)
      
        // createOrder

        let newpayload = {
            isPaid: payMethod === 'PAYPAL' ? true : false ,
            payMethod: payMethod,
            tableName: tableName,
            wish: wish,
            userId: userId,
            products: [...payload]
        };


        return API.graphql({
            query: mutations.createOrder,
            variables: {
                input: newpayload
            }
          }).then(data => {
            dispatch({
                type: REDUCER.UPDATE_ORDER_INVOICE,
                invoice: newpayload
            })
        
            console.log("data", data)
            return Validation.success;
        })
        .catch(err => {
            console.log("error", err)
            return Validation.error;
        })

    } 
}

const CategoryList = {
    getAllCategoryList,
    updateCart,
    getItemList,
    getItemDetails,
    deleteItemFromCart,
    getItemDetailsFromTotalList,
    callingWaiter,
    undoCallingWaiter,
    cancelSearchText,
    updateSearchText,
    updateIconsInSearch,
    userCheckin,
    createOrder,
    getUserDetails
}

export default CategoryList;
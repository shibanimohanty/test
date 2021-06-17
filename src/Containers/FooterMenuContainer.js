import { connect } from 'react-redux';
import Action from '../Actions/index';
import FooterMenuWithFeatures from '../Components/Footer/FooterMenuWithFeatures';

const mapStateToProps = state => {
    return {
        categoryList: state.CategoryListReducer.categoryList,
        itemList: state.CategoryListReducer.itemList,
        itemDetails: state.CategoryListReducer.itemDetails,
        cartList: state.CategoryListReducer.cartList,
        waiterCalling: state.BellRingReducer.waiterCalling,
        searchText: state.CategoryListReducer.searchText,
        searchIcon: state.CategoryListReducer.searchIcon,
        searchResult: state.CategoryListReducer.searchResult,
        globalSearch: state.CategoryListReducer.globalSearch
    }
}

const mapDispatchToProps = dispatch => ({
    updateCart: (item, itemId, type) => dispatch(Action.CategoryList.updateCart(item, itemId, type)),
    callingWaiter: () => dispatch(Action.CategoryList.callingWaiter()),
    undoCallingWaiter: () => dispatch(Action.CategoryList.undoCallingWaiter()),
    updateSearchText: (search, selectedFilterIcon) => dispatch(Action.CategoryList.updateSearchText(search, selectedFilterIcon)),
    cancelSearchText: (iconReset) => dispatch(Action.CategoryList.cancelSearchText(iconReset)),
    updateIconsInSearch: (icons) => dispatch(Action.CategoryList.updateIconsInSearch(icons)),
    userCreateOrder: (payMethod) => dispatch(Action.CategoryList.createOrder(payMethod))
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterMenuWithFeatures);
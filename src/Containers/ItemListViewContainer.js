import { connect } from 'react-redux';
import Action from '../Actions/index';
import ItemListView from '../Components/ItemListView/ItemListView';

const mapStateToProps = state => {
    return {
        categoryList: state.CategoryListReducer.categoryList,
        itemList: state.CategoryListReducer.itemList,
        itemDetails: state.CategoryListReducer.itemDetails,
        cartList: state.CategoryListReducer.cartList,
        searchText: state.CategoryListReducer.searchText,
        searchIcon: state.CategoryListReducer.searchIcon,
        searchResult: state.CategoryListReducer.searchResult,
        globalSearch: state.CategoryListReducer.globalSearch,
        categoryName: state.CategoryListReducer.categoryName
    }
}

const mapDispatchToProps = dispatch => ({
    getItemDetails: (itemId) => dispatch(Action.CategoryList.getItemDetails(itemId)),
    updateCart: (item, itemId, type) => dispatch(Action.CategoryList.updateCart(item, itemId, type)),
    cancelSearchText: (iconReset) => dispatch(Action.CategoryList.cancelSearchText(iconReset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemListView);
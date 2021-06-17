import { connect } from 'react-redux';
import Action from '../Actions/index';
import CategoryDashboard from '../Components/Category/CategoryDashboard';

const mapStateToProps = state => {
    return {
        categoryList: state.CategoryListReducer.categoryList,
        itemList: state.CategoryListReducer.itemList,
        itemDetails: state.CategoryListReducer.itemDetails,
        cartList: state.CategoryListReducer.cartList,
        searchText: state.CategoryListReducer.searchText,
        searchIcon: state.CategoryListReducer.searchIcon,
        globalSearch: state.CategoryListReducer.globalSearch
    }
}

const mapDispatchToProps = dispatch => ({
    getAllCategoryList: () => dispatch(Action.CategoryList.getAllCategoryList()),
    getItemList: (categoryId) => dispatch(Action.CategoryList.getItemList(categoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDashboard);
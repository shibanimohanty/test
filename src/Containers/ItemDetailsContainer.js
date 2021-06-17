import { connect } from 'react-redux';
import Action from '../Actions/index';
import itemDetails from '../Components/ItemDetails/ItemDetails';

const mapStateToProps = state => {
    return {
        categoryList: state.CategoryListReducer.categoryList,
        itemList: state.CategoryListReducer.itemList,
        itemDetails: state.CategoryListReducer.itemDetails,
        cartList: state.CategoryListReducer.cartList
    }
}

const mapDispatchToProps = dispatch => ({
    getItemDetails: (itemId) => dispatch(Action.CategoryList.getItemDetails(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(itemDetails);
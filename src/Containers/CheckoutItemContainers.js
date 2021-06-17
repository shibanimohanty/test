import { connect } from 'react-redux';
import Action from '../Actions/index';
import Checkout from '../Components/Checkout/Checkout';

const mapStateToProps = state => {
    return {
        categoryList: state.CategoryListReducer.categoryList,
        itemList: state.CategoryListReducer.itemList,
        itemDetails: state.CategoryListReducer.itemDetails,
        cartList: state.CategoryListReducer.cartList
    }
}

const mapDispatchToProps = dispatch => ({
    updateCart: (item, itemId, type) => dispatch(Action.CategoryList.updateCart(item, itemId, type)),
    deleteItemFromCart: (itemId) => dispatch(Action.CategoryList.deleteItemFromCart(itemId)),
    getItemDetailsFromTotalList: (item) => dispatch(Action.CategoryList.getItemDetailsFromTotalList(item)),
    userCreateOrder: (payMethod) => dispatch(Action.CategoryList.createOrder(payMethod))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
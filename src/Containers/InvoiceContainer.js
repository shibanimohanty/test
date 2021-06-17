import { connect } from 'react-redux';
import Action from '../Actions/index';
import Invoice from '../Components/Invoice';

const mapStateToProps = state => {
    return {
        invoice: state.CategoryListReducer.invoice
    }
}

const mapDispatchToProps = dispatch => ({
    getItemDetailsFromTotalList: (item) => dispatch(Action.CategoryList.getItemDetailsFromTotalList(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
import { connect } from 'react-redux';
import Action from '../Actions/index';
import CheckIn from '../Components/CheckIn/CheckIn';

const mapStateToProps = state => {
    return {
        userId: state.CategoryListReducer.userId,
        tableName: state.CategoryListReducer.tableName
    }
}
const mapDispatchToProps = dispatch => ({
    userCheckin: (user) => dispatch(Action.CategoryList.userCheckin(user)),
    getUserDetails: (urlData) => dispatch(Action.CategoryList.getUserDetails(urlData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
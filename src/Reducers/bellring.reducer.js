import { REDUCER } from '../Constants/Reducer';

const BellRingReducer = (state = {

    waiterCalling: false
}, action) => {
    switch (action.type) {

        case REDUCER.UPDATE_WAITER_CALL:
            return {
                ...state,
                waiterCalling: action.waiterCalling
            }
        default:
            return state;
    }
}

export default BellRingReducer;
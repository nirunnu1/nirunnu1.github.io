import {
    Loading
} from './actions'
// initial state
const initialState = {
    isLoading: false,
};
const defaultUC = (state = initialState, action) => {
    switch (action.type) {
        case Loading: {
            return {
                ...state,
                isLoading: action.payload,
                // loadUser: true,
            }
        }
        default:
            return state
    }
}
export default defaultUC
import {
  PermissionMenu
  // , PermissionSubMenu
} from "./actions";
// initial state
const initialState = {
  permissionid: null,
};
const LoadingState = (state = initialState, action) => {
  switch (action.type) {
    case PermissionMenu: {
      return {
        ...state,
        permissionid: action.payload,
      };
    }

    default:
      return state;
  }
};
export default LoadingState;

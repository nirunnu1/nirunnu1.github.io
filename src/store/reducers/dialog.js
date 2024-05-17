import { Dialog } from "./actions";
// initial state
const initialState = {
  dialog: {
    open: false,
    title: "test",
    description: "description",
  },
};
const func = (state = initialState, action) => {
  switch (action.type) {
    case Dialog: {
      return {
        ...state,
        dialog: action.payload,
        // loadUser: true,
      };
    }
    default:
      return state;
  }
};

export default func
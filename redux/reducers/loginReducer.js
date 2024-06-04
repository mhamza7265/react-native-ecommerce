import { produce } from "immer";

const IS_LOGGED_IN = "IS_LOGGED_IN";
const IS_LOGGED_OUT = "IS_LOGGED_OUT";

export const userLoggedIn = () => {
  return {
    type: IS_LOGGED_IN,
    payload: true,
  };
};

export const userLoggedOut = () => {
  return {
    type: IS_LOGGED_OUT,
    payload: false,
  };
};

const initialState = {
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return produce(state, (draft) => {
        draft.isLoggedIn = action.payload;
      });
      break;
    case IS_LOGGED_OUT:
      return produce(state, (draft) => {
        draft.isLoggedIn = action.payload;
      });
      break;
    default:
      return state;
  }
};

export default loginReducer;

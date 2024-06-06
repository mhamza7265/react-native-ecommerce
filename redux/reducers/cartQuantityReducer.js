import { produce } from "immer";

const UPDATE_CART_QTY = "UPDATE_CART_QTY";

export const updateCartQuantity = (product) => {
  return { type: UPDATE_CART_QTY, payload: product };
};

const initialState = { cartQuantity: 0 };

const cartQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART_QTY:
      return produce(state, (draft) => {
        draft.cartQuantity = action.payload;
      });
      break;

    default:
      return state;
  }
};

export default cartQuantityReducer;

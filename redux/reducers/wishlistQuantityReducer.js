import { produce } from "immer";

const UPDATE_WISHLIST_QUANTITY = "UPDATE_WISHLIST_QUANTITY";

export const updateWishlistQuantity = (data) => {
  return {
    type: UPDATE_WISHLIST_QUANTITY,
    payload: data,
  };
};

const initialState = {
  wishlistQuantity: 0,
};

const wishlistQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WISHLIST_QUANTITY:
      return produce(state, (draft) => {
        draft.wishlistQuantity = action.payload;
      });
      break;
    default:
      return state;
  }
};

export default wishlistQuantityReducer;

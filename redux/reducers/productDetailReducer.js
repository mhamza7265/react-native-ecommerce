import { produce } from "immer";
const ADD_PRODUCT = "ADD_PRODUCT";

export const addProductWithDetail = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: data,
  };
};

const initialState = {
  product: null,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return produce(state, (draft) => {
        draft.product = action.payload;
      });
    default:
      return state;
  }
};

export default productDetailReducer;

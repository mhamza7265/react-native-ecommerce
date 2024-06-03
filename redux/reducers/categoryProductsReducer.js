import { produce } from "immer";

const ADD_PPRODUCTS = "ADD_PPRODUCTS";

export const addProducts = (data) => {
  return {
    type: ADD_PPRODUCTS,
    payload: data,
  };
};

const initialState = {
  products: null,
};

const categoryProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PPRODUCTS:
      return produce(state, (draft) => {
        draft.products = action.payload;
      });
    default:
      return state;
  }
};

export default categoryProductsReducer;

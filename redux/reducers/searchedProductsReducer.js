import { produce } from "immer";

const ADD_SEARCHED_PRODUCTS = "ADD_SEARCHED_PRODUCTS";

export const addSearchedProducts = (data) => {
  return {
    type: ADD_SEARCHED_PRODUCTS,
    payload: data,
  };
};

const initialState = {
  products: null,
};

const searchedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCHED_PRODUCTS:
      return produce(state, (draft) => {
        draft.products = action.payload;
      });
    default:
      return state;
  }
};

export default searchedProductReducer;

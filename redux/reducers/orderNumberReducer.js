import { produce } from "immer";

const UPDATE_ORDER_NUM = "UPDATE_ORDER_NUM";

export const updateOrderNumber = (num) => {
  return { type: UPDATE_ORDER_NUM, payload: num };
};

const initialState = { orderNumber: null };

const orderNumberReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_NUM:
      return produce(state, (draft) => {
        draft.orderNumber = action.payload;
      });
      break;

    default:
      return state;
  }
};

export default orderNumberReducer;

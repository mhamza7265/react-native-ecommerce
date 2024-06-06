import { produce } from "immer";

const UPDATE_BILLING_ADDRESS = "UPDATE_BILLING_ADDRESS";

export const updateBillingAddress = (data) => {
  return {
    type: UPDATE_BILLING_ADDRESS,
    payload: data,
  };
};

const initialState = {
  address: null,
  city: null,
  state: null,
  country: null,
};

const billingAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BILLING_ADDRESS:
      return produce(state, (draft) => {
        draft.address = action.payload.address;
        draft.city = action.payload.city;
        draft.state = action.payload.state;
        draft.country = action.payload.country;
      });
      break;
    default:
      return state;
  }
};

export default billingAddressReducer;

import { produce } from "immer";

const START_LOADER = "START_LOADER";
const STOP_LOADER = "STOP_LOADER";

export const startLoader = () => {
  return {
    type: START_LOADER,
    payload: true,
  };
};

export const stopLoader = () => {
  return {
    type: STOP_LOADER,
    payload: false,
  };
};

const initialState = {
  loaderIsActive: false,
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADER:
      return produce(state, (draft) => {
        draft.loaderIsActive = action.payload;
      });
      break;
    case STOP_LOADER:
      return produce(state, (draft) => {
        draft.loaderIsActive = action.payload;
      });
      break;
    default:
      return state;
  }
};

export default activityReducer;

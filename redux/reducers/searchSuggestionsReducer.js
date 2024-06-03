import { produce } from "immer";

const ADD_SEARCH_SUGGESTIONS = "ADD_SEARCH_SUGGESTIONS";

export const addSearchSuggestions = (data) => {
  return {
    type: ADD_SEARCH_SUGGESTIONS,
    payload: data,
  };
};

const initialState = {
  suggestions: null,
};

const searchSuggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_SUGGESTIONS:
      return produce(state, (draft) => {
        draft.suggestions = action.payload;
      });
    default:
      return state;
  }
};

export default searchSuggestionsReducer;

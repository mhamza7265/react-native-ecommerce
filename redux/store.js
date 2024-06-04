import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import categoryProductsReducer from "./reducers/categoryProductsReducer";
import productDetailReducer from "./reducers/productDetailReducer";
import searchSuggestionsReducer from "./reducers/searchSuggestionsReducer";
import searchedProductReducer from "./reducers/searchedProductsReducer";
import activityReducer from "./reducers/activityReducer";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
  categoryProducts: categoryProductsReducer,
  productDetail: productDetailReducer,
  searchSuggestions: searchSuggestionsReducer,
  searchedProducts: searchedProductReducer,
  activity: activityReducer,
  login: loginReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

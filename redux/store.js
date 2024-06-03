import { createStore, combineReducers } from "redux";
import categoryProductsReducer from "./reducers/categoryProductsReducer";
import productDetailReducer from "./reducers/productDetailReducer";
import searchSuggestionsReducer from "./reducers/searchSuggestionsReducer";
import searchedProductReducer from "./reducers/searchedProductsReducer";

const rootReducer = combineReducers({
  categoryProducts: categoryProductsReducer,
  productDetail: productDetailReducer,
  searchSuggestions: searchSuggestionsReducer,
  searchedProducts: searchedProductReducer,
});

const store = createStore(rootReducer);

export default store;

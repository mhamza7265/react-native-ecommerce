import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import categoryProductsReducer from "./reducers/categoryProductsReducer";
import productDetailReducer from "./reducers/productDetailReducer";
import searchSuggestionsReducer from "./reducers/searchSuggestionsReducer";
import searchedProductReducer from "./reducers/searchedProductsReducer";
import activityReducer from "./reducers/activityReducer";
import loginReducer from "./reducers/loginReducer";
import wishlistQuantityReducer from "./reducers/wishlistQuantityReducer";
import wishlistReducer from "./reducers/wishlistReducer";
import cartQuantityReducer from "./reducers/cartQuantityReducer";
import cartReducer from "./reducers/cartReducer";
import billingAddressReducer from "./reducers/billingAddressReducer";
import orderReducer from "./reducers/orderReducer";
import orderNumberReducer from "./reducers/orderNumberReducer";

const rootReducer = combineReducers({
  categoryProducts: categoryProductsReducer,
  productDetail: productDetailReducer,
  searchSuggestions: searchSuggestionsReducer,
  searchedProducts: searchedProductReducer,
  activity: activityReducer,
  login: loginReducer,
  wishlistQuantity: wishlistQuantityReducer,
  wishlist: wishlistReducer,
  cartQuantity: cartQuantityReducer,
  cart: cartReducer,
  billing: billingAddressReducer,
  orders: orderReducer,
  orderNumber: orderNumberReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

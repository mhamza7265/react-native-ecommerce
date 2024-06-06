import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "../components/Home/Header";
import SearchHeader from "../components/Home/SearchHeader";
import HomeCarousel from "../components/Home/HomeCarousel";
import Categories from "../components/Home/categories/Categories";
import Products from "../components/Home/products/Products";
import { useSelector, useDispatch } from "react-redux";
import sendRequest from "../Utility/apiManager";
import { addSearchSuggestions } from "../redux/reducers/searchSuggestionsReducer";
import { addSearchedProducts } from "../redux/reducers/searchedProductsReducer";
import { useNavigation } from "@react-navigation/native";
import { startLoader, stopLoader } from "../redux/reducers/activityReducer";
import { useEffect } from "react";
import { addWishlist } from "../redux/reducers/wishlistReducer";
import { updateWishlistQuantity } from "../redux/reducers/wishlistQuantityReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLoggedIn } from "../redux/reducers/loginReducer";
import { updateCartQuantity } from "../redux/reducers/cartQuantityReducer";
import { updateCart } from "../redux/reducers/cartReducer";

function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const suggestions = useSelector(
    (state) => state.searchSuggestions.suggestions
  );

  useEffect(() => {
    sendRequest("get", "wishlist").then((res) => {
      if (res.status) {
        dispatch(addWishlist(res.wishlist));
      }
    });
    sendRequest("get", "wishlist/qty")
      .then((res) => {
        if (res.status) {
          dispatch(updateWishlistQuantity(res.wishlistQuantity));
        }
      })
      .catch((err) => {
        console.log("wishlistGetQtyErr", err);
      });

    sendRequest("get", "cart/qty")
      .then((res) => {
        if (res.status) {
          dispatch(updateCartQuantity(res.quantity));
        }
      })
      .catch((err) => {
        console.log("cartQtyGetErr", err);
      });

    sendRequest("get", "cart")
      .then((res) => {
        if (res.status) {
          dispatch(updateCart(res.cart));
        }
      })
      .catch((err) => {
        console.log("cartGetErr", err);
      });

    AsyncStorage.getItem("currentUser")
      .then((res) => {
        if (res) {
          dispatch(userLoggedIn());
        }
      })
      .catch((err) => {
        console.log("tokenFetchError", err);
      });
  }, []);

  const handleSuggestionPress = (text) => {
    dispatch(startLoader());
    sendRequest("post", "products/filter", { products: text })
      .then((res) => {
        dispatch(stopLoader());
        dispatch(addSearchedProducts(res.filtered));
        dispatch(addSearchSuggestions(null));
        navigation.navigate("Searched Products");
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
      });
  };

  return (
    <View style={style.container}>
      <Header />
      <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
        <SearchHeader />
        {suggestions && (
          <View style={style.absoluteBox}>
            {suggestions &&
              suggestions?.map((item, i) => (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => handleSuggestionPress(item)}
                >
                  <Text>{item}</Text>
                </TouchableWithoutFeedback>
              ))}
          </View>
        )}
        <HomeCarousel />
        <Categories />
        <Products />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F5F6",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
  },
  absoluteBox: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 55,
    left: 45,
    padding: 5,
    zIndex: 99999,
    width: "76.5%",
    minHeightheight: 50,
    maxHeight: 210,
    margin: "auto",
    elevation: 5,
    overflow: "scroll",
  },
});

export default Home;

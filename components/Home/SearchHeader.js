import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import sendRequest from "../../Utility/apiManager";
import { useDispatch } from "react-redux";
import { addSearchSuggestions } from "../../redux/reducers/searchSuggestionsReducer";
import { useState } from "react";
import { addSearchedProducts } from "../../redux/reducers/searchedProductsReducer";
import { useNavigation } from "@react-navigation/native";
import { startLoader, stopLoader } from "../../redux/reducers/activityReducer";

function SearchHeader() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState(null);

  const handleSearchChange = (text) => {
    if (text) {
      sendRequest("post", `products/filter`, {
        products: text,
        autoComplete: true,
      })
        .then((res) => {
          dispatch(addSearchSuggestions(res.filteredNames));
        })
        .catch((err) => console.log("err", err));
    } else {
      dispatch(addSearchSuggestions(null));
    }
  };

  const handleSearchPress = () => {
    dispatch(startLoader());
    sendRequest("post", "products/filter", { products: inputValue })
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
    <View style={[style.row, { marginTop: 5 }]}>
      <View style={style.box}>
        <TextInput
          placeholder="Search"
          style={{
            width: "100%",
            paddingLeft: 10,
            paddingRight: 50,
            height: 35,
          }}
          onChangeText={(text) => {
            handleSearchChange(text);
            setInputValue(text);
          }}
        />
        <TouchableOpacity style={style.button} onPress={handleSearchPress}>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            resizeMethod="scale"
            resizeMode="contain"
            source={require("../../assets/images/magnifying-glass.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    position: "relative",
  },
  button: {
    backgroundColor: "#FDC040",
    padding: 8,
    position: "absolute",
    top: "50%",
    right: 0,
    transform: [{ translateY: -18 }],
  },
  box: {
    width: "80%",
    margin: "auto",
    position: "relative",
    borderWidth: 1,
    borderColor: "#3BB77E",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchHeader;

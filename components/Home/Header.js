import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const wishlistQty = useSelector(
    (state) => state.wishlistQuantity.wishlistQuantity
  );
  const cartQty = useSelector((state) => state.cartQuantity.cartQuantity);

  console.log("cartQty", cartQty);

  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("currentUser");
        if (value !== null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return (
    <View style={style.row}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 110,
          height: 40,
          objectFit: "contain",
        }}
        onError={(error) => console.log("Error loading image:", error)}
      />
      <View
        style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
      >
        <TouchableOpacity
          style={{ marginRight: 10, position: "relative" }}
          onPress={() => navigation.navigate("Wishlist")}
        >
          <FontAwesome name="heart" size={22} style={{ color: "#3BB77E" }} />
          <View style={style.absQty}>
            <Text style={style.absText}>{wishlistQty}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 10, position: "relative" }}
          onPress={() => navigation.navigate("Cart")}
        >
          <FontAwesome
            name="shopping-cart"
            size={24}
            style={{ color: "#3BB77E" }}
          />
          <View style={style.absQty}>
            <Text style={style.absText}>{cartQty}</Text>
          </View>
        </TouchableOpacity>
        {!isLoggedIn && (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 12 }}>Login</Text>
          </TouchableOpacity>
        )}
        {isLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: 5 }}
          >
            <Text style={{ fontSize: 12 }}>Profile</Text>
          </TouchableOpacity>
        )}
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
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  absQty: {
    position: "absolute",
    right: 0,
    backgroundColor: "#FDC040",
    width: 13,
    borderRadius: 8,
  },
  absText: { fontSize: 7, fontWeight: "bold", textAlign: "center" },
});

export default Header;

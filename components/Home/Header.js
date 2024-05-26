import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();
  return (
    <View style={style.row}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 100,
          height: 30,
          objectFit: "contain",
        }}
        onError={(error) => console.log("Error loading image:", error)}
      />
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <FontAwesome name="heart" size={20} style={{ color: "#3BB77E" }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <FontAwesome
            name="shopping-cart"
            size={20}
            style={{ color: "#3BB77E" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 12 }}>Login</Text>
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
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Header;
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CartRow from "./CartRow";
import { useNavigation } from "@react-navigation/native";

function Cart() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View style={style.box1}>
        {[...Array(5)].map((_, i) => (
          <CartRow key={i} />
        ))}
      </View>
      <View
        style={[
          style.box1,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>$38.84</Text>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("Billing")}
        >
          <Text style={{ color: "#fff" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  box1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  box1Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  removeBtn: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 18,
    backgroundColor: "#EA4C62",
  },
  image: {
    height: 60,
    width: 60,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: "#000",
  },
  count: {
    borderWidth: 1,
    padding: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "lightgray",
  },
  countBtn: {
    backgroundColor: "#FF6666",
    padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderWidth: 1,
    borderColor: "gray",
  },
  button: { backgroundColor: "#3BB77E", padding: 10, borderRadius: 10 },
});

export default Cart;

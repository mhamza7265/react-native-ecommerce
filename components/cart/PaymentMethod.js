import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

function PaymentMethod() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <TouchableOpacity>
        <View style={style.box}>
          <FontAwesome name="credit-card" size={55} style={style.icon} />
          <Text style={style.text}>Credit Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("COD")}>
        <View style={style.box}>
          <FontAwesome6
            name="hand-holding-dollar"
            size={55}
            style={style.icon}
          />
          <Text style={style.text}>Cash on Delivery</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
  },
  box: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    elevation: 5,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  icon: { margin: "auto", color: "#00B894", marginBottom: 10 },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethod;

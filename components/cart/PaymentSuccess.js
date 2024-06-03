import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

function PaymentSuccess() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <FontAwesome6Icon
        name="money-bill-transfer"
        size={50}
        style={style.icon}
      />
      <Text style={style.text1}>Payment successful</Text>
      <Text style={style.text2}>
        We will notify you of all the details via email. Thank you!
      </Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome6Icon
          name="arrow-left-long"
          size={20}
          style={style.icon2}
        />
        <Text style={{ color: "#fff" }}>Shop Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#0E29D1",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    color: "#fff",
  },
  icon2: { color: "#fff", marginRight: 10 },
  text1: {
    marginTop: 10,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  text2: {
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3BB77E",
    marginTop: 30,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PaymentSuccess;

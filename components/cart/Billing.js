import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function Billing() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={style.box}>
        <View style={style.box1}>
          <Text style={style.title}>Billing Information</Text>
        </View>
        <View style={{ padding: 20 }}>
          <View style={style.row}>
            <View style={style.row1}>
              <FontAwesome name="user" size={18} style={style.icon} />
              <Text style={style.text1}>Full Name</Text>
            </View>
            <Text>Muhammad Hamza</Text>
          </View>

          <View style={style.row}>
            <View style={style.row1}>
              <FontAwesome
                name="envelope"
                size={14}
                style={[style.icon, { paddingTop: 12, paddingBottom: 12 }]}
              />
              <Text style={style.text1}>Email</Text>
            </View>
            <Text>m.hamza@gmail.com</Text>
          </View>

          <View style={style.row}>
            <View style={style.row1}>
              <FontAwesome
                name="phone"
                size={18}
                style={[style.icon, { paddingTop: 11, paddingBottom: 11 }]}
              />
              <Text style={style.text1}>Phone</Text>
            </View>
            <Text>+923424259468</Text>
          </View>

          <View style={style.row}>
            <View style={style.row1}>
              <FontAwesome
                name="address-card"
                size={14}
                style={[style.icon, { paddingTop: 14, paddingBottom: 14 }]}
              />
              <Text style={style.text1}>Address</Text>
            </View>
            <Text>Lorem Ipsum...</Text>
          </View>

          <TouchableOpacity
            style={style.button1}
            onPress={() => navigation.navigate("Edit Profile")}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Edit Billing Information
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          style.box,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
          },
        ]}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>$38.84</Text>
        <TouchableOpacity
          style={style.button2}
          onPress={() => navigation.navigate("Payment Method")}
        >
          <Text style={{ color: "#fff" }}>Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
  },
  box1: {
    backgroundColor: "#EA4C62",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  row1: { flexDirection: "row", alignItems: "center" },
  text1: { marginLeft: 5, fontWeight: "bold" },
  icon: {
    padding: 10,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: "#00B894",
    color: "#fff",
    borderRadius: 20,
  },
  button1: {
    backgroundColor: "#EA4C62",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button2: { backgroundColor: "#3BB77E", padding: 10, borderRadius: 10 },
});

export default Billing;

import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.box1}>
        <Image
          source={require("../assets/images/me.jpg")}
          style={style.image}
        />
        <View>
          <Text style={[style.box1Text1, { textAlign: "right" }]}>
            Muhammad Hamza
          </Text>
          <Text style={{ textAlign: "right" }}>m.hamza7265@gmail.com</Text>
        </View>
      </View>
      <View style={style.box2}>
        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Email</Text>
          <Text style={{ color: "gray" }}>m.hamza7265@gmail.com</Text>
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Full Name</Text>
          <Text style={{ color: "gray" }}>Muhammad Hamza</Text>
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Phone</Text>
          <Text style={{ color: "gray" }}>03424259468</Text>
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Address</Text>
          <Text style={{ color: "gray" }}>Lorem Ipsum</Text>
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>My Orders</Text>
          <TouchableOpacity
            style={style.orderBtn}
            onPress={() => navigation.navigate("Orders")}
          >
            <Text style={{ color: "#fff" }}>Orders</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={style.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: { marginLeft: 8, marginRight: 8, marginTop: 8 },
  box1: {
    backgroundColor: "#FFAF00",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
  },
  box1Text1: { fontSize: 18, fontWeight: "bold" },
  box2: {
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  box2ContentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3BB77E",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { textAlign: "center", color: "#fff" },
  orderBtn: { backgroundColor: "#FFAF00", padding: 5, borderRadius: 5 },
});

export default Profile;

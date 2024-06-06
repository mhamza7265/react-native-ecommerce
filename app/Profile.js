import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/reducers/loginReducer";
import { useEffect, useState } from "react";
import sendRequest from "../Utility/apiManager";
import BASE_URL from "../Utility/config";

function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    sendRequest("get", "user")
      .then((res) => {
        if (res.status) {
          setProfile(res.user);
        }
      })
      .catch((err) => {
        console.log("profileGetErr", err);
      });
  }, []);

  const handleLogoutPress = async () => {
    dispatch(userLoggedOut());
    try {
      await AsyncStorage.removeItem("currentUser");
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    } catch (e) {
      // remove error
    }
  };

  return (
    <View style={style.container}>
      <View style={style.box1}>
        <Image
          source={{ uri: BASE_URL + "/" + profile?.image }}
          style={style.image}
        />
        <View>
          <Text style={[style.box1Text1, { textAlign: "right" }]}>
            {profile?.first_name + " " + profile?.last_name}
          </Text>
          <Text style={{ textAlign: "right", fontSize: 13 }}>
            {profile?.email}
          </Text>
        </View>
        <TouchableOpacity style={style.absBox} onPress={handleLogoutPress}>
          <Text style={style.absBoxText}>Logout</Text>
          <FontAwesome
            name="sign-out"
            size={28}
            style={style.icon}
            color={"#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={style.box2}>
        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Email</Text>
          <Text style={{ color: "gray", fontSize: 13 }}>{profile?.email}</Text>
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Full Name</Text>
          <Text style={{ color: "gray" }}>
            {profile?.first_name + " " + profile?.last_name}
          </Text>
        </View>

        {/* <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Phone</Text>
          <Text style={{ color: "gray" }}>03424259468</Text>
        </View> */}

        {/* <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Address</Text>
          <Text style={{ color: "gray" }}>Lorem Ipsum</Text>
        </View> */}

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
  absBox: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#3BB77E",
    padding: 5,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 15,
  },
  icon: { marginLeft: 5 },
  absBoxText: { color: "#fff" },
});

export default Profile;

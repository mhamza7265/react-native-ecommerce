import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ToastAndroid,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import sendRequest from "../../Utility/apiManager";
import BASE_URL from "../../Utility/config";
import { useDispatch, useSelector } from "react-redux";
import { startLoader, stopLoader } from "../../redux/reducers/activityReducer";
import { useNavigation } from "@react-navigation/native";
import { addCurrentUser } from "../../redux/reducers/currentUserReducer";

function EditProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.currentUser.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    sendRequest("get", "user")
      .then((res) => {
        if (res.status) {
          setProfile(res.user);
          dispatch(addCurrentUser(res.user));
        }
      })
      .catch((err) => {
        console.log("profileGetError", err);
      });
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    data.firstName && formData.append("first_name", data.firstName);
    data.lastName && formData.append("last_name", data.lastName);
    imageUri &&
      formData.append("file", {
        uri: imageUri?.uri,
        type: "image/jpeg",
        name: "photo.jpg",
        fileName: "photo.jpg",
      });
    dispatch(startLoader());
    sendRequest("put", "user", formData, "formData")
      .then((res) => {
        dispatch(stopLoader());
        if (res.status) {
          showToast(res.message);
          sendRequest("get", "user")
            .then((res) => {
              if (res.status) {
                setProfile(res.user);
                dispatch(addCurrentUser(res.user));
              }
            })
            .catch((err) => {
              console.log("profileGetError", err);
            });
          setTimeout(() => {
            navigation.navigate("Profile");
          }, 1000);
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
      });
  };

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0]);
    }
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.box1}>
        <View style={{ position: "relative" }}>
          <Image
            source={
              imageUri
                ? { uri: imageUri.uri }
                : { uri: BASE_URL + "/" + user?.image }
            }
            style={style.image}
          />
          <TouchableOpacity style={style.imageEdit} onPress={handleImageSelect}>
            <FontAwesome name="pencil" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ textAlign: "right" }}>
          <Text style={[style.box1Text1, { textAlign: "right" }]}>
            {user?.first_name + " " + user?.last_name}
          </Text>
          <Text style={{ textAlign: "right", fontSize: 13 }}>
            {user?.email}
          </Text>
        </View>
      </View>
      <View style={style.box2}>
        {/* <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Email</Text>
          <Input
            placeholder="Email"
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={false}
          />
        </View> */}

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>First Name</Text>
          <Input
            placeholder="First Name"
            name="firstName"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={false}
          />
        </View>

        <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Last Name</Text>
          <Input
            placeholder="Last Name"
            name="lastName"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={false}
          />
        </View>

        {/* <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Phone</Text>
          <Input
            placeholder="Phone"
            name="phone"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={false}
          />
        </View> */}

        {/* <View style={style.box2ContentBox}>
          <Text style={{ fontSize: 16 }}>Address</Text>
          <Input
            placeholder="Address"
            name="address"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={false}
          />
        </View> */}

        <TouchableOpacity style={style.button} onPress={handleSubmit(onSubmit)}>
          <Text style={style.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  imageEdit: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "65%",
    left: "65%",
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 18,
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
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#3BB77E",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { textAlign: "center", color: "#fff" },
});
export default EditProfile;

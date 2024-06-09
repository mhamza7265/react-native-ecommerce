import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import InputPassword from "../components/common/InputPassword";
import * as ImagePicker from "expo-image-picker";
import InputConfirmPassword from "../components/common/InputConfirmPassword";
import sendRequest from "../Utility/apiManager";
import { useDispatch } from "react-redux";
import { startLoader, stopLoader } from "../redux/reducers/activityReducer";

function Register({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const confirm = watch("password");

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
  }, []);

  const selectImage = async () => {
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("role", "basic");
    formData.append("image", {
      uri: imageUri.uri,
      type: "image/jpeg",
      name: "photo.jpeg",
      fileName: "photo.jpeg",
    });
    dispatch(startLoader());
    sendRequest("post", "register", formData, "formData")
      .then((res) => {
        dispatch(stopLoader());
        console.log("res", res);
        if (res.status) {
          showToast(res.message);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 1000);
        } else {
          // showToast(res.error);
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
        showToast(err);
      });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.text}>Register</Text>
        <View style={style.link1}>
          <Text style={{ marginRight: 5 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text> Login</Text>
          </TouchableOpacity>
        </View>
        <Input
          placeholder="First Name"
          name="firstName"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />
        <Input
          placeholder="Email"
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />
        <View style={{ marginBottom: 40 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              padding: 20,
              borderRadius: 15,
              borderWidth: 1,
            }}
            onPress={selectImage}
          >
            <Text style={{ textAlign: "center" }}>SELECT AN IMAGE</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri.uri }} style={style.image} />
          )}
        </View>

        <InputPassword
          placeholder="Password"
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />

        <InputConfirmPassword
          placeholder="Confirm Password"
          name="confirmPassword"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
          confirm={confirm}
        />

        <TouchableOpacity style={style.button} onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: "#fff", textAlign: "center" }}>REGISTER</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderRadius: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3bb77e",
    paddingTop: 70,
    paddingBottom: 55,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  text: {
    textAlign: "left",
    fontFamily: "QuickSandRegular",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 45,
  },
  input: {
    borderColor: " #ececec",
    backgroundColor: "lightblue",
    borderWidth: 1,
    height: 64,
    paddingLeft: 20,
    fontSize: 16,
    borderRadius: 16,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "#3bb77e",
    height: 50,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 100,
  },
  link1: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default Register;

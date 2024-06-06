import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import InputPassword from "../components/common/InputPassword";
import * as ImagePicker from "expo-image-picker";
import InputConfirmPassword from "../components/common/InputConfirmPassword";
import sendRequest from "../Utility/apiManager";

function Register({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const confirm = watch("password");

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
    console.log("registerForm", { ...data, image: imageUri });
    let image = imageUri;

    const imageData = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image.uri, true);
      xhr.send(null);
    });

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("role", "basic");
    formData.append("image", { ...imageData._data, type: "image/jpeg" });

    // ReactNativeBlobUtil.fetch(
    //   "POST",
    //   "http://192.168.100.4:3000/register",
    //   {
    //     Authorization: "",
    //     "Content-Type": "multipart/form-data",
    //   },
    //   [
    //     // element with property `filename` will be transformed into `file` in form data
    //     { name: "image", filename: "photo.png", data: binaryDataInBase64 },
    //     // custom content type
    //     {
    //       name: "image",
    //       filename: "photo-png.png",
    //       type: "image/png",
    //       data: binaryDataInBase64,
    //     },
    //     // part file from storage
    //     {
    //       name: "image",
    //       filename: "photo.png",
    //       type: "image/jpg",
    //       data: ReactNativeBlobUtil.wrap(imageUri.uri),
    //     },
    //     // elements without property `filename` will be sent as plain text
    //     { name: "email", data: data.email },
    //     { name: "firstName", data: data.firstName },
    //     { name: "lastName", data: data.lastName },
    //     { name: "password", data: data.password },
    //     { name: "role", data: data.role },
    //   ]
    // )
    //   .then((resp) => {
    //     console.log("response", resp);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });

    //   axios
    //     .post("http://192.168.100.4:3000/register", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => console.log("res", res))
    //     .catch((err) => console.log("err", err));
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

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

  const onSubmit = (data) => {
    console.log("registerForm", { ...data, image: imageUri });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.text}>Register</Text>
        <Text style={{ marginBottom: 15 }}>
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text> Login</Text>
          </TouchableOpacity>
        </Text>
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
});

export default Register;

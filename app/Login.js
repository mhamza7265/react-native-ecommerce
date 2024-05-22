import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import InputPassword from "../components/common/InputPassword";

function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useFonts({
    QuickSandRegular: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const onSubmit = (data) => {
    console.log("loginDetails", data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={style.container}>
        <Text style={style.text}>Login</Text>
        <Text style={{ marginBottom: 15 }}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Create Here</Text>
          </TouchableOpacity>
        </Text>
        <Input
          placeholder="Email"
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />
        <InputPassword
          placeholder="Password"
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          errors={errors}
          control={control}
          required={true}
        />
        <TouchableOpacity>
          <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button} onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: "#fff", textAlign: "center" }}>LOGIN</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 10,
    marginRight: 10,
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
});

export default Login;

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import InputPassword from "../components/common/InputPassword";
import sendRequest from "../Utility/apiManager";
import { useDispatch } from "react-redux";
import { startLoader, stopLoader } from "../redux/reducers/activityReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { userLoggedIn } from "../redux/reducers/loginReducer";

function Login({ navigation }) {
  const dispatch = useDispatch();

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("currentUser", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useFonts({
    QuickSandRegular: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const onSubmit = (data) => {
    dispatch(startLoader());
    sendRequest("post", "login", {
      ...data,
      password: data.password,
      userRole: "basic",
    })
      .then((res) => {
        dispatch(stopLoader());
        if (res.status) {
          dispatch(userLoggedIn());
          showToast(res.login);
          storeData(res.token);
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000);
        } else {
          showToast(res.error);
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        // showToast(err);
        console.log("errLogin", err);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={style.container}>
        <Text style={style.text}>Login</Text>
        <View style={style.link1}>
          <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Create Here</Text>
          </TouchableOpacity>
        </View>
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
  link1: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default Login;

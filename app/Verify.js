import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  ToastAndroid,
} from "react-native";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { startLoader, stopLoader } from "../redux/reducers/activityReducer";
import sendRequest from "../Utility/apiManager";

function Verify({ navigation }) {
  const user = useSelector((state) => state.loginUser.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const onSubmit = (data) => {
    dispatch(startLoader());
    sendRequest("post", "verify", {
      email: data.email,
      code: Number(data.code),
    })
      .then((res) => {
        if (res.status) {
          dispatch(stopLoader());
          showToast(res.verified);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 1000);
        } else {
          dispatch(stopLoader());
          showToast(res.error);
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        showToast(err);
      });
  };

  return (
    <View style={style.container}>
      <View style={style.box}>
        <Input
          placeholder={"Email"}
          autoCorrect={false}
          autoCapitalize={"none"}
          name="email"
          errors={errors}
          control={control}
          required={true}
          defaultValue={user}
        />
        <Input
          placeholder={"Verification Code"}
          autoCorrect={false}
          autoCapitalize={"none"}
          name="code"
          errors={errors}
          control={control}
          required={true}
        />
        <TouchableHighlight
          style={style.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={style.btnText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  box: {
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
  button: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "#3bb77e",
    height: 50,
    padding: 10,
  },
  btnText: { color: "#fff", textAlign: "center" },
});

export default Verify;

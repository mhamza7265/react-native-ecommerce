import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import { useEffect, useState } from "react";
import sendRequest from "../../Utility/apiManager";
import { useDispatch } from "react-redux";
import { updateBillingAddress } from "../../redux/reducers/billingAddressReducer";

function Billing() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    sendRequest("get", "cart")
      .then((res) => {
        if (res.status) {
          setCart(res.cart[0]);
        }
      })
      .catch((err) => {
        console.log("cartGetErr", err);
      });
  }, []);

  const handlePaymentMethodPress = (data) => {
    dispatch(updateBillingAddress(data));
    navigation.navigate("Payment Method");
  };

  return (
    <ScrollView>
      <View style={style.box}>
        <View style={style.box1}>
          <Text style={style.title}>Billing Information</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Input
            placeholder="Address"
            name="address"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={true}
          />

          <Input
            placeholder="City"
            name="city"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={true}
          />

          <Input
            placeholder="State"
            name="state"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={true}
          />

          <Input
            placeholder="Country"
            name="country"
            autoCapitalize="none"
            autoCorrect={false}
            errors={errors}
            control={control}
            required={true}
          />
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
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          ${cart?.grandTotal}
        </Text>
        <TouchableOpacity
          style={style.button2}
          onPress={handleSubmit(handlePaymentMethodPress)}
        >
          <Text style={{ color: "#fff" }}>Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

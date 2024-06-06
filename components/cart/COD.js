import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import sendRequest from "../../Utility/apiManager";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startLoader, stopLoader } from "../../redux/reducers/activityReducer";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";
import { updateOrder } from "../../redux/reducers/orderReducer";

const { width } = Dimensions.get("window");

function COD() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const billingAddress = useSelector((state) => state.billing);

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

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

  const handleOrder = () => {
    dispatch(startLoader());
    sendRequest("post", "checkout", {
      address: billingAddress?.address,
      city: billingAddress?.city,
      state: billingAddress?.state,
      country: billingAddress?.country,
      cartId: cart?._id,
      cartItems: cart?.cartItems,
      subTotal: cart?.subTotal,
      discount: cart?.discount,
      grandTotal: cart?.grandTotal,
      paymentType: "cash-on-delivery",
    }).then((res) => {
      dispatch(stopLoader());
      if (res.status) {
        showToast(res.message);

        sendRequest("get", "cart/qty")
          .then((res) => {
            console.log(res);
            dispatch(updateCartQuantity(res.quantity));

            sendRequest("get", "orders")
              .then((res) => {
                if (res.status) dispatch(updateOrder(res.orders));
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });

        navigation.navigate("Payment Success");
      }
    });
  };

  return (
    <View>
      <Image
        source={require("../../assets/images/pay-bg.png")}
        style={style.image}
      />
      <Text style={style.text}>
        Pay when you receive your products. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Et qui nam perferendis.
      </Text>
      <TouchableOpacity style={style.button} onPress={handleOrder}>
        <Text style={style.text2}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: width / 1.1,
    height: width / 2,
    marginTop: 20,
    margin: "auto",
  },
  text: {
    marginTop: 30,
    marginRight: 11,
    marginLeft: 11,
    textAlign: "center",
    lineHeight: 20,
    color: "#747794",
  },
  button: {
    padding: 18,
    backgroundColor: "#3BB77E",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  text2: { textAlign: "center", color: "#fff" },
});

export default COD;

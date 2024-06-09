import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import sendRequest from "../../Utility/apiManager";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { startLoader, stopLoader } from "../../redux/reducers/activityReducer";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";
import { updateOrder } from "../../redux/reducers/orderReducer";

function PaymentMethod() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);
  const user = useSelector((state) => state.currentUser.user);
  const billingAddress = useSelector((state) => state.billing);

  const fetchPaymentSheetParams = async () => {
    const response = await sendRequest("post", "payment-sheet");
    const { paymentIntent, ephemeralKey, customer } = await response;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ecommerce",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: user?.first_name + " " + user?.last_name,
      },
    });
    if (!error) {
      setLoading(true);
      console.log("loading...");
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      handleOrder();
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();

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
      paymentType: "card-payment",
    }).then((res) => {
      dispatch(stopLoader());
      if (res.status) {
        // showToast(res.message);

        sendRequest("get", "cart/qty")
          .then((res) => {
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
    <View style={style.container}>
      <TouchableOpacity onPress={openPaymentSheet}>
        <View style={style.box}>
          <FontAwesome name="credit-card" size={55} style={style.icon} />
          <Text style={style.text}>Credit Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("COD")}>
        <View style={style.box}>
          <FontAwesome6
            name="hand-holding-dollar"
            size={55}
            style={style.icon}
          />
          <Text style={style.text}>Cash on Delivery</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
  },
  box: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    elevation: 5,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  icon: { margin: "auto", color: "#00B894", marginBottom: 10 },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethod;

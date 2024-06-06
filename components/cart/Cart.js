import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CartRow from "./CartRow";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendRequest from "../../Utility/apiManager";
import { updateCart } from "../../redux/reducers/cartReducer";

function Cart() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart.cart);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    sendRequest("get", "cart")
      .then((res) => {
        if (res.status) {
          dispatch(updateCart(res.cart[0].cartItems[0]));
          setCart(res.cart[0]);
        }
      })
      .catch((err) => {
        console.log("cartGetErr", err);
      });
  }, []);

  console.log("cart", cart);

  return (
    <ScrollView>
      <View style={style.box1}>
        {cart && Object.keys(cart.cartItems[0]).length > 0 ? (
          Object.values(cart.cartItems[0]).map((item, i) => (
            <CartRow
              key={i}
              prodId={item.productId}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.images[0]}
              discount={item.discount.discountValue}
              quantity={item.quantity}
              calculations={item.calculations}
              setCart={setCart}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>Cart is empty</Text>
        )}
      </View>

      {cart && Object.keys(cart.cartItems[0]).length > 0 && (
        <View
          style={[
            style.box1,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            ${cart?.grandTotal}
          </Text>
          <TouchableOpacity
            style={style.button}
            onPress={() => navigation.navigate("Billing")}
          >
            <Text style={{ color: "#fff" }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  box1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  box1Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  removeBtn: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 18,
    backgroundColor: "#EA4C62",
  },
  image: {
    height: 60,
    width: 60,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: "#000",
  },
  count: {
    borderWidth: 1,
    padding: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "lightgray",
  },
  countBtn: {
    backgroundColor: "#FF6666",
    padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderWidth: 1,
    borderColor: "gray",
  },
  button: { backgroundColor: "#3BB77E", padding: 10, borderRadius: 10 },
});

export default Cart;

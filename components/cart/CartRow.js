import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import BASE_URL from "../../Utility/config";
import { startLoader, stopLoader } from "../../redux/reducers/activityReducer";
import sendRequest from "../../Utility/apiManager";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/reducers/cartReducer";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";

function CartRow({
  prodId,
  name,
  price,
  quantity,
  discount,
  description,
  calculations,
  image,
  setCart,
}) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(quantity);
    setValue(quantity);
  }, [value]);

  useEffect(() => {
    sendRequest("get", `product/quantity/${prodId}`).then((res) => {
      setProductQuantity(res.availableQuantity);
    });
  }, [quantity]);

  const handleDecrementClick = () => {
    if (count > 1) {
      console.log("d");
      setCount(() => count - 1);
    } else {
      return;
    }
    const handleSendRequest = (countValue) => {
      let calculate = quantity - countValue;
      dispatch(startLoader());
      sendRequest("post", "cart", {
        id: prodId,
        quantity: calculate,
        decreaseQuantity: true,
      })
        .then((res) => {
          dispatch(stopLoader());
          if (res.status) {
            sendRequest("get", `product/quantity/${prodId}`).then((res) => {
              setProductQuantity(res.availableQuantity);
            });
            showToast(res.message);
            sendRequest("get", "cart")
              .then((res) => {
                if (res.status) {
                  setCart(res.cart[0]);
                  dispatch(updateCart(res.cart[0]));
                }
              })
              .catch((err) => {
                console.log("cartGetError", err);
              });
          }
        })
        .catch((err) => {
          showToast("cartUpdateErr", err);
        });
    };
    handleSendRequest(count > 1 ? count - 1 : count);
  };

  const handleIncrementClick = () => {
    productQuantity > 0 ? setCount((prevCount) => prevCount + 1) : null;

    const handleSendRequest = (countValue) => {
      dispatch(startLoader());
      sendRequest("post", "cart", {
        id: prodId,
        quantity: Math.abs(parseInt(countValue) - parseInt(quantity)),
        increaseQuantity: true,
      })
        .then((res) => {
          dispatch(stopLoader());
          if (res.status) {
            sendRequest("get", `product/quantity/${prodId}`).then((res) => {
              setProductQuantity(res.availableQuantity);
            });

            showToast(res.message);

            sendRequest("get", "cart")
              .then((res) => {
                if (res.status) {
                  setCart(res.cart[0]);
                  dispatch(updateCart(res.cart[0]));
                }
              })
              .catch((err) => {
                console.log("cartGetError", err);
              });
          }
        })
        .catch((err) => {
          errorToast(err.error);
        });
    };
    handleSendRequest(count + 1);
  };

  const handleDeleteClick = () => {
    dispatch(startLoader());
    sendRequest("delete", `cart`, { product: prodId, quantity })
      .then((res) => {
        if (res.status) {
          dispatch(stopLoader());
          showToast("Product removed from cart!");
          sendRequest("get", "cart")
            .then((res) => {
              if (res.status) {
                dispatch(updateCart(res.cart[0]));
                setCart(res.cart[0]);
                sendRequest("get", "cart/qty")
                  .then((res) => {
                    dispatch(updateCartQuantity(res.quantity));
                  })
                  .catch((err) => {
                    console.log("cartQtyErr", err);
                  });
              }
            })
            .catch((err) => {
              console.log("cartGetErr", err);
            });
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log(err);
      });
  };

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  return (
    <View style={style.box1Row}>
      <TouchableOpacity style={style.removeBtn} onPress={handleDeleteClick}>
        <FontAwesome name="xmark" size={10} style={{ color: "#fff" }} />
      </TouchableOpacity>
      <Image source={{ uri: BASE_URL + "/" + image[0] }} style={style.image} />
      <View>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: "gray" }}>
          ${price - (price / 100) * discount} * {quantity}{" "}
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={style.count}>{quantity}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={style.countBtn}
            onPress={handleIncrementClick}
          >
            <FontAwesome name="angle-up" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.countBtn}
            onPress={handleDecrementClick}
          >
            <FontAwesome name="angle-down" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box1Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  removeBtn: {
    padding: 7,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 18,
    backgroundColor: "#EA4C62",
  },
  image: {
    height: 60,
    width: 60,
    objectFit: "contain",
    borderColor: "#000",
  },
  count: {
    borderWidth: 1,
    padding: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "lightgray",
    textAlign: "center",
  },
  countBtn: {
    backgroundColor: "silver",
    padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderColor: "gray",
  },
});

export default CartRow;

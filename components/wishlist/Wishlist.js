import { ScrollView, Text, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WishlistCard from "./WishlistCard";
import { useEffect } from "react";
import sendRequest from "../../Utility/apiManager";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../redux/reducers/wishlistReducer";
import { updateWishlistQuantity } from "../../redux/reducers/wishlistQuantityReducer";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    sendRequest("get", "wishlist")
      .then((res) => {
        if (res.status) {
          dispatch(addWishlist(res.wishlist));
        } else {
          showToast(res.error);
        }
      })
      .catch((err) => {
        console.log("wishlistGetError", err);
      });
  }, []);

  const removeFromWishlist = (id) => {
    sendRequest("post", "wishlist", { prodId: id })
      .then((res) => {
        if (res.status) {
          showToast(res.message);
          sendRequest("get", "wishlist")
            .then((res) => {
              if (res.status) {
                dispatch(addWishlist(res.wishlist));
              }
            })
            .catch((err) => {
              console.log("wishlistGetError", err);
            });

          sendRequest("get", "wishlist/qty")
            .then((res) => {
              if (res.status) {
                dispatch(updateWishlistQuantity(res.wishlistQuantity));
              }
            })
            .catch((err) => {
              console.log("wishlistGetQtyErr", err);
            });
        }
      })
      .catch((err) => {
        console.log("wishlistPostError", err);
      });
  };

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  return (
    <ScrollView>
      {wishlist ? (
        wishlist.map((item, i) => (
          <WishlistCard
            key={i}
            id={item.productId}
            discount={item.product[0].discount?.discountValue}
            name={item.product[0].name}
            price={item.product[0].price}
            image={item.product[0].images[0]}
            removeFromWishlist={removeFromWishlist}
          />
        ))
      ) : (
        <Text style={{ textAlign: "center" }}>Wishlist is empty</Text>
      )}
    </ScrollView>
  );
}

export default Wishlist;

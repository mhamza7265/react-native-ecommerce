import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BASE_URL from "../../../Utility/config";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addProductWithDetail } from "../../../redux/reducers/productDetailReducer";
import sendRequest from "../../../Utility/apiManager";
import {
  startLoader,
  stopLoader,
} from "../../../redux/reducers/activityReducer";

const { width } = Dimensions.get("window");

function CategoryProductsCard({ id, images, name, price, discountValue }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressProduct = () => {
    dispatch(startLoader());
    sendRequest("get", `product/single/${id}`)
      .then((res) => {
        dispatch(stopLoader());
        if (res.status) {
          dispatch(addProductWithDetail(res.data[0]));
          navigation.navigate("Product");
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={onPressProduct}>
      <View style={style.card}>
        <Image
          source={{ uri: BASE_URL + "/" + images[0] }}
          style={style.image}
        />
        <Text style={style.cardText}>{name}</Text>
        <Text style={{ color: "#3bb77e", marginTop: 10, fontSize: 20 }}>
          ${price - (price / 100) * discountValue}
          <Text
            style={{
              textDecorationLine: "line-through",
              fontSize: 14,
              color: "gray",
            }}
          >
            ${price}
          </Text>
        </Text>
        <View style={style.row}>
          <TouchableOpacity style={style.button}>
            <FontAwesome
              name="shopping-cart"
              size={20}
              style={{ color: "#fff" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonTwo}>
            <FontAwesome name="heart" size={18} style={{ color: "#000" }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  card: {
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: width / 2.11,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#3bb77e",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: width / 4,
    objectFit: "contain",
  },
  cardText: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3bb77e",
    padding: 5,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonTwo: {
    backgroundColor: "#def9ec",
    padding: 5,
    borderRadius: 5,
    marginTop: 30,
  },
});

export default CategoryProductsCard;

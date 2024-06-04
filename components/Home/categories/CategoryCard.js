import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BASE_URL from "../../../Utility/config";
import sendRequest from "../../../Utility/apiManager";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../redux/reducers/categoryProductsReducer";
import { useNavigation } from "@react-navigation/native";
import {
  startLoader,
  stopLoader,
} from "../../../redux/reducers/activityReducer";

const { width } = Dimensions.get("window");

function CategoryCard({ id, image, name }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const touchCategoryCard = () => {
    dispatch(startLoader());
    sendRequest("get", `product/${id}`)
      .then((res) => {
        dispatch(stopLoader());
        if (res.status) {
          dispatch(addProducts(res.data));
          navigation.navigate("Products");
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={touchCategoryCard}>
        <View style={style.card}>
          <Image source={{ uri: BASE_URL + "/" + image }} style={style.image} />
          <Text style={style.cardText}>
            {name[0].toUpperCase() + name.substring(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: width / 3.5,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    elevation: 5,
  },
  image: {
    width: "90%",
    height: 60,
    borderRadius: 20,
    margin: "auto",
  },
  cardText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default CategoryCard;

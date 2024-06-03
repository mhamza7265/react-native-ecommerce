import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Slick from "react-native-slick";
import Swiper from "react-native-swiper";
import { useEffect, useState } from "react";
import sendRequest from "../../../Utility/apiManager";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../../../Utility/config";
import CategoryCard from "./CategoryCard";

const { width } = Dimensions.get("window");

function Categories() {
  const [categoriesList, setCategoriesList] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    sendRequest("get", "category")
      .then((res) => {
        if (res.status) {
          setCategoriesList(res.categories);
          console.log("cat", res);
        } else {
          console.log("err", res.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const getProducts = () => {
    sendRequest("get");
  };

  return (
    <View style={{ paddingTop: 15, flex: 1 }}>
      <Text style={style.text}>CATEGORIES</Text>
      {/* <Swiper
        showsButtons={false}
        autoplay={false}
        autoplayTimeout={3}
        loop={true}
        dotColor="rgba(255, 255, 255, 0.5)"
        activeDotColor="#fff"
        paginationStyle={{ bottom: 10 }}
        style={style.wrapper}
      > */}
      <View style={style.row}>
        {categoriesList &&
          categoriesList.map((item, i) => (
            <CategoryCard
              key={i}
              id={item._id}
              image={item.image}
              name={item.name}
            />
          ))}
      </View>
      {/* </Swiper> */}
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    height: 200,
    flexDirection: "row",
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 15,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
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

export default Categories;

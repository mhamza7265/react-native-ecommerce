import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Slick from "react-native-slick";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import BASE_URL from "../../../Utility/config";

const { width } = Dimensions.get("window");
function ProductDetails() {
  const [count, setCount] = useState(0);
  const [addToWishlist, setAddToWishlist] = useState(false);
  const productDetail = useSelector((state) => state.productDetail.product);

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={style.imageContainer}>
          <Slick
            style={style.wrapper}
            height={200}
            showsButtons={false}
            autoplay={false}
          >
            {productDetail?.images.map((item, i) => (
              <Image
                source={{ uri: BASE_URL + "/" + item }}
                style={style.image}
                key={i}
              />
            ))}
          </Slick>
        </View>
        <View style={style.box}>
          <View style={style.innerBox}>
            <Text style={style.textHead}>{productDetail?.name}</Text>
            <TouchableOpacity
              style={style.icon}
              onPress={() => setAddToWishlist(!addToWishlist)}
            >
              <FontAwesome
                name="heart"
                size={20}
                color={addToWishlist ? "#3bb77e" : "gray"}
              />
            </TouchableOpacity>
            <Text style={style.text1}>
              $
              {productDetail?.price -
                (productDetail?.price / 100) *
                  productDetail.discount.discountValue}
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontSize: 14,
                  color: "gray",
                }}
              >
                ${productDetail?.price}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={style.box2}>
        <View style={{ flexDirection: "row", marginRight: 50 }}>
          <TouchableOpacity
            onPress={() => {
              count > 0 && setCount(count - 1);
            }}
          >
            <FontAwesome name="minus" size={16} style={style.counterKey} />
          </TouchableOpacity>
          <Text style={style.count}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <FontAwesome name="plus" size={16} style={style.counterKey} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.button}>
          <Text style={{ color: "#fff" }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={style.box3}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Specifications</Text>
        <Text style={{ marginTop: 20, fontSize: 12, color: "gray" }}>
          {productDetail?.description}
        </Text>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E7E9F5",
  },
  imageContainer: {
    height: width,
    backgroundColor: "#E7E9F5",
    borderBottomRightRadius: 200,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width / 1.25,
    height: width / 1.25,
    margin: "auto",
    objectFit: "contain",
    borderRadius: width / 2,
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#E7E9F5",
  },
  innerBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    padding: 25,
    position: "relative",
  },
  textHead: { borderTopLeftRadius: 50, fontSize: 18, fontWeight: "bold" },
  text1: {
    fontSize: 18,
    color: "#3bb77e",
    fontWeight: "bold",
  },
  icon: { position: "absolute", top: 30, right: 25 },
  box2: {
    backgroundColor: "#fff",
    width,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    padding: 12,
    backgroundColor: "#3bb77e",
    borderRadius: 10,
  },
  counterKey: {
    borderWidth: 1,
    borderColor: "#F2F2F2",
    paddingTop: 13,
    paddingBottom: 12,
    paddingRight: 15,
    paddingLeft: 18,
    borderRadius: 20,
    backgroundColor: "#FEF8FF",
  },
  count: {
    borderWidth: 1,
    borderColor: "#F1F1F2",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
  },
  box3: {
    backgroundColor: "#fff",
    padding: 25,
    marginTop: 10,
    width,
  },
});

export default ProductDetails;

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import sendRequest from "../../../Utility/apiManager";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import {
  startLoader,
  stopLoader,
} from "../../../redux/reducers/activityReducer";
const { width } = Dimensions.get("window");

function Products() {
  const [productsList, setProductsList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest("get", "products/listing?page=1")
      .then((res) => {
        if (res.status) {
          setProductsList(res.products);
        } else {
          console.log("err", res.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const loadMoreProducts = () => {
    dispatch(startLoader());
    sendRequest("get", `products/listing?page=${productsList.page + 1}`)
      .then((res) => {
        dispatch(stopLoader());
        if (res.status) {
          setProductsList({
            ...res.products,
            docs: [...productsList.docs, ...res.products.docs],
          });
        }
      })
      .catch((err) => {
        dispatch(stopLoader());
        console.log("err", err);
      });
  };

  return (
    <View style={{ paddingTop: 15, flex: 1 }}>
      <Text style={style.text}>PRODUCTS</Text>
      <View style={style.row}>
        {productsList &&
          productsList?.docs.map((item, i) => (
            <ProductCard
              key={i}
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              discountValue={item.discount.discountValue}
            />
          ))}
      </View>
      {productsList?.hasNextPage && (
        <TouchableOpacity style={style.btnLoadMore} onPress={loadMoreProducts}>
          <Text style={style.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const style = StyleSheet.create({
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
    justifyContent: "space-around",
  },
  btnLoadMore: {
    backgroundColor: "#3bb77e",
    width: width / 3.5,
    padding: 5,
    borderRadius: 10,
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  loadMoreText: { textAlign: "center", color: "#fff" },
});

export default Products;

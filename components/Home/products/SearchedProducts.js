import { ScrollView, View, Text, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function SearchedProducts() {
  const searchedProducts = useSelector(
    (state) => state.searchedProducts.products
  );

  return (
    <View style={{ paddingTop: 15, flex: 1 }}>
      <ScrollView>
        <Text style={style.text}>PRODUCTS</Text>
        <View style={style.row}>
          {searchedProducts &&
            searchedProducts?.map((item, i) => (
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
      </ScrollView>
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
    justifyContent: "flex-start",
  },
});

export default SearchedProducts;

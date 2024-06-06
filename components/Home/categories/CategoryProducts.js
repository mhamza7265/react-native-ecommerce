import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CategoryProductsCard from "./CategoryProductsCard";
import ProductCard from "../products/ProductCard";

function CategoryProducts() {
  const categoryProducts = useSelector(
    (state) => state.categoryProducts.products
  );

  return (
    <ScrollView>
      <View style={style.row}>
        {categoryProducts &&
          categoryProducts.map((item, i) => (
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
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default CategoryProducts;

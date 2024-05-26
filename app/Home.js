import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import Header from "../components/Home/Header";
import SearchHeader from "../components/Home/SearchHeader";
import HomeCarousel from "../components/Home/HomeCarousel";
import Categories from "../components/Home/categories/Categories";
import Products from "../components/Home/products/Products";

function Home() {
  return (
    <View style={style.container}>
      <Header />
      <ScrollView>
        <SearchHeader />
        <HomeCarousel />
        <Categories />
        <Products />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F5F6",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
  },
});

export default Home;

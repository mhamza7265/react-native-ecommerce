import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import Slick from "react-native-slick";
import { useFonts } from "expo-font";

const { width } = Dimensions.get("window");

const data = [
  { image: require("../../assets/images/slider-1.webp"), text: "Lorem Ipsum" },
  { image: require("../../assets/images/slider-2.webp"), text: "Lorem Ipsum" },
  { image: require("../../assets/images/slider-3.webp"), text: "Lorem Ipsum" },
  { image: require("../../assets/images/slider-4.webp"), text: "Lorem Ipsum" },
];

function HomeCarousel() {
  useFonts({
    QuickSand: require("../../assets/fonts/Quicksand-Bold.ttf"),
  });

  return (
    <Slick
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={3.5}
    >
      {data.map((item, i) => (
        <View style={[styles.slide, { position: "relative" }]} key={i}>
          <Text style={styles.text}>{item.text}</Text>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </Slick>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    width,
  },
  image: {
    width,
    height: 200,
    resizeMode: "cover",
  },
  text: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -50 }],
    left: "5%",
    zIndex: 9999,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#d3d3d357",
    padding: 10,
    borderRadius: 15,
  },
});

export default HomeCarousel;

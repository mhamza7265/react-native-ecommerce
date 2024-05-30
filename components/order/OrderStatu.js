import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

function OrderStatus() {
  const orderStatus = [
    { icon: "shopping-basket", date: "5/30/24", title: "Order Placed" },
    { icon: "cube", date: "5/31/24", title: "Product Packaging" },
    { icon: "ship", date: "6/1/24", title: "Ready to Ship" },
  ];
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/orderBg.jpg")}
        style={{ height: "100%", alignItems: "center" }}
      >
        <View style={style.container}>
          <ScrollView>
            {orderStatus.map((item, i) => (
              <View style={style.orderBox} key={i}>
                <FontAwesome name={item.icon} size={16} style={style.icon} />
                <View style={style.box1}>
                  <Text style={style.text1}>{item.title}</Text>
                  <Text>{item.date}</Text>
                </View>
                <FontAwesome name="check" size={16} style={style.checkIcon} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: width / 1.05,
    minHeight: width / 2,
    maxHeight: width * 1.5,
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#fff",
    margin: "auto",
    borderRadius: 10,
  },
  orderBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    borderRightWidth: 1,
    borderStyle: "dashed",
    borderColor: "lightgray",
    position: "relative",
    marginRight: 20,
  },
  viewBtn: {
    backgroundColor: "#FFAF00",
    padding: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  icon: {
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#EA4C62",
  },
  box1: { marginRight: "auto", marginLeft: 20 },
  text1: { margin: "auto", fontWeight: "bold" },
  checkIcon: {
    color: "green",
    borderWidth: 2,
    borderColor: "green",
    paddingLeft: 8,
    paddingRight: 4,
    paddingTop: 6,
    paddingBottom: 3,
    borderRadius: 16,
    position: "absolute",
    left: "100%",
  },
});

export default OrderStatus;

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

function Orders() {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/orderBg.jpg")}
        style={{ height: "100%", alignItems: "center" }}
      >
        <View style={style.container}>
          <ScrollView>
            {[...Array(5)].map((_, i) => (
              <View style={style.orderBox} key={i}>
                <Text style={{ color: "#fff" }}>{i + 1}</Text>
                <Text style={{ margin: "auto", color: "#fff" }}>
                  Lorem Ipsum....
                </Text>
                <Text style={{ color: "#fff" }}>5/30/24</Text>
                <TouchableOpacity
                  style={style.viewBtn}
                  onPress={() => navigation.navigate("Order Status")}
                >
                  <Text>Status</Text>
                </TouchableOpacity>
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
    minHeight: width,
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
    justifyContent: "space-between",
    backgroundColor: "#EA4C62",
    padding: 8,
    marginBottom: 10,
  },
  viewBtn: {
    backgroundColor: "#FFAF00",
    padding: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
});

export default Orders;

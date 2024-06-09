import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import sendRequest from "../../Utility/apiManager";
import OrderCard from "./OrderCard";

const { width } = Dimensions.get("window");

function Orders() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    sendRequest("get", "orders")
      .then((res) => {
        if (res.status) {
          setOrders(res.orders);
        }
      })
      .catch((err) => {
        console.log("ordersGetErr", err);
      });
  }, []);

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/orderBg.jpg")}
        style={{ height: "100%", alignItems: "center" }}
      >
        <View style={style.container}>
          <ScrollView>
            {orders &&
              orders.map((item, i) => (
                <OrderCard
                  key={i}
                  sr={i + 1}
                  name={item.name}
                  date={item.orderDate}
                  orderId={item.orderId}
                  id={item._id}
                />
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

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateOrderNumber } from "../../redux/reducers/orderNumberReducer";

function OrderCard({ sr, date, orderId, id }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const handleOrderStatusPress = () => {
    dispatch(updateOrderNumber(id));
    navigation.navigate("Order Status");
  };

  return (
    <View style={style.orderBox}>
      <Text style={{ color: "#fff", fontSize: 12 }}>{sr}</Text>
      <Text style={{ margin: "auto", color: "#fff", fontSize: 13 }}>
        {orderId}
      </Text>
      <Text style={{ color: "#fff", fontSize: 10 }}>
        {day + "-" + month + "-" + year}
      </Text>
      <TouchableOpacity style={style.viewBtn} onPress={handleOrderStatusPress}>
        <Text>Status</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
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

export default OrderCard;

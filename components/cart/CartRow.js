import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome6";
import { useState } from "react";

function CartRow() {
  const [count, setCount] = useState(0);

  return (
    <View style={style.box1Row}>
      <TouchableOpacity style={style.removeBtn}>
        <FontAwesome name="xmark" size={20} style={{ color: "#fff" }} />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/motorcycle.jpg")}
        style={style.image}
      />
      <View>
        <Text style={{ fontWeight: "bold" }}>motorcycle</Text>
        <Text style={{ color: "gray" }}>$25 * 1</Text>
      </View>
      <Text style={style.count}>{count}</Text>
      <View>
        <TouchableOpacity
          style={style.countBtn}
          onPress={() => setCount(count + 1)}
        >
          <FontAwesome name="angle-up" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.countBtn}
          onPress={() => count > 0 && setCount(count - 1)}
        >
          <FontAwesome name="angle-down" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box1Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  removeBtn: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 18,
    backgroundColor: "#EA4C62",
  },
  image: {
    height: 60,
    width: 60,
    objectFit: "contain",
    borderColor: "#000",
  },
  count: {
    borderWidth: 1,
    padding: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "lightgray",
  },
  countBtn: {
    backgroundColor: "silver",
    padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderColor: "gray",
  },
});

export default CartRow;

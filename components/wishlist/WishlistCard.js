import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

function WishlistCard() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Product")}>
      <View style={style.card}>
        <View style={style.trash}>
          <TouchableOpacity onPress={() => console.log("trig")}>
            <FontAwesome6Icon name="trash" size={16} style={style.trashIcon} />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/motorcycle.jpg")}
          style={style.image}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={style.text1}>Motorcycle</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <FontAwesome6Icon name="dollar-sign" size={16} style={style.icon} />
            <Text style={{ color: "#3bb77e", fontSize: 20 }}>
              $25{"  "}
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontSize: 14,
                  color: "gray",
                }}
              >
                $50
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  image: {
    objectFit: "contain",
    height: 150,
    width: 150,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    backgroundColor: "#332858",
    color: "#fff",
    padding: 2,
    paddingLeft: 6,
    paddingRight: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  trashIcon: {
    color: "red",
    borderWidth: 1,
    padding: 5,
    paddingTop: 9,
    paddingLeft: 10,
    paddingRight: 8,
    borderRadius: 16,
    borderColor: "#F3F3F4",
    backgroundColor: "#F3F3F4",
  },
  trash: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
  },
});

export default WishlistCard;

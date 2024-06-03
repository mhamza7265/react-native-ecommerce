import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

function COD() {
  const navigation = useNavigation();
  return (
    <View>
      <Image
        source={require("../../assets/images/pay-bg.png")}
        style={style.image}
      />
      <Text style={style.text}>
        Pay when you receive your products. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Et qui nam perferendis.
      </Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Payment Success")}
      >
        <Text style={style.text2}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: width / 1.1,
    height: width / 2,
    marginTop: 20,
    margin: "auto",
  },
  text: {
    marginTop: 30,
    marginRight: 11,
    marginLeft: 11,
    textAlign: "center",
    lineHeight: 20,
    color: "#747794",
  },
  button: {
    padding: 18,
    backgroundColor: "#3BB77E",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  text2: { textAlign: "center", color: "#fff" },
});

export default COD;

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
function Products() {
  const navigation = useNavigation();

  return (
    <View style={{ paddingTop: 15, flex: 1 }}>
      <Text style={style.text}>PRODUCTS</Text>
      <View style={style.row}>
        {[...Array(6)].map((_, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => navigation.navigate("Product")}
          >
            <View style={style.card}>
              <Image
                source={require("../../../assets/images/motorcycle.jpg")}
                style={style.image}
              />
              <Text style={style.cardText}>LOREM IPSUM</Text>
              <Text style={{ color: "#3bb77e" }}>$90</Text>
              <View style={style.row}>
                <TouchableOpacity style={style.button}>
                  <FontAwesome
                    name="shopping-cart"
                    size={20}
                    style={{ color: "#fff" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonTwo}>
                  <FontAwesome
                    name="heart"
                    size={18}
                    style={{ color: "#000" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 15,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  card: {
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: width / 2.11,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#3bb77e",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: width / 4,
    objectFit: "contain",
  },
  cardText: {
    textAlign: "left",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#3bb77e",
    padding: 5,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonTwo: {
    backgroundColor: "#def9ec",
    padding: 5,
    borderRadius: 5,
    marginTop: 30,
  },
});

export default Products;

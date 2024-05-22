import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Home() {
  return (
    <View style={style.container}>
      <View style={style.row}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            width: 100,
            height: 30,
            objectFit: "contain",
          }}
          onError={(error) => console.log("Error loading image:", error)}
        />
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <FontAwesome name="heart" size={20} style={{ color: "#3BB77E" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="shopping-cart"
              size={20}
              style={{ color: "#3BB77E" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[style.row, { marginTop: 5 }]}>
        <View
          style={{
            width: "80%",
            margin: "auto",
            position: "relative",
            borderWidth: 1,
            borderColor: "#3BB77E",
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              top: "50%",
              right: 5,
              transform: [{ translateY: -10 }],
            }}
            resizeMethod="scale"
            resizeMode="contain"
            source={require("../assets/images/magnifying-glass.png")}
          />
          <TextInput
            placeholder="Search"
            style={{
              width: "100%",
              paddingLeft: 10,
              paddingRight: 50,
            }}
          />
        </View>
      </View>
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

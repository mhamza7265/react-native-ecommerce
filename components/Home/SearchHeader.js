import { View, Image, TextInput, StyleSheet } from "react-native";

function SearchHeader() {
  return (
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
          source={require("../../assets/images/magnifying-glass.png")}
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
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
  },
});

export default SearchHeader;

import { StyleSheet, Text, View } from "react-native";
import Login from "./app/Login";
import { useFonts } from "expo-font";
import Register from "./app/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/Home";
import ProductDetails from "./components/Home/products/ProductDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    QuickSandRegular: require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  if (!fontLoaded) {
    return undefined;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={ProductDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    fontFamily: "QuickSandRegular",
    backgroundColor: "#fff",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

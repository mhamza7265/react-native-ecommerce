import { StyleSheet, Text, View } from "react-native";
import Login from "./app/Login";
import { useFonts } from "expo-font";
import Register from "./app/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/Home";
import ProductDetails from "./components/Home/products/ProductDetails";
import Profile from "./app/Profile";
import EditProfile from "./components/profile/EditProfile";
import Orders from "./components/order/Orders";
import OrderStatus from "./components/order/OrderStatu";
import Cart from "./components/cart/Cart";
import Billing from "./components/cart/Billing";

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
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Product" component={ProductDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Order Status" component={OrderStatus} />
        <Stack.Screen name={"Billing"} component={Billing} />
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

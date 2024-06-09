import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./Main";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51OgnngCZAiYypOnUtpzuyqpnUAilEOQyEk9M8aXZ1zl2sfQV7iWNsbdfvEDhlHbe1iF3lkGosYA6TYFExeYElaM3005kpwWTxc">
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}

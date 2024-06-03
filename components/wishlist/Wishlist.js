import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WishlistCard from "./WishlistCard";

function Wishlist() {
  return (
    <ScrollView>
      {[...Array(5)].map((_, i) => (
        <WishlistCard key={i} />
      ))}
    </ScrollView>
  );
}

export default Wishlist;

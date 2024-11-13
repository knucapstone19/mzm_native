import { Text, View } from "react-native";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";

const LooklikeResScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <Text>{data}</Text>
    </View>
  );
};

export default LooklikeResScreen;

import { View, Text } from "react-native";
import TopBar from "../components/TopBar";

import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const BellScreen = () => {
  return (
    <View>
      <TopBar title="알림" />
      <View className="flex-col justify-center h-screen">
        <View className="flex items-center gap-y-2 mb-40">
          <WarningIcon />
          <Text className={`${styles("main")} text-[#111111]`}>
            알림이 없어요ㅠㅠ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BellScreen;

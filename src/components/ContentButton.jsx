import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const ContentButton = ({
  text,
  isDisabled = false,
  isShare = false,
  marginTop = null,
  handleNavigate,
}) => {
  return (
    <TouchableOpacity
      style={{ elevation: 1 }}
      className={`w-48 mt-${marginTop} py-2.5 rounded-full ${
        isDisabled ? "bg-[#B0B0B0]" : isShare ? "bg-white" : "bg-[#40BAFF]"
      }`}
      onPress={handleNavigate}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <Text
        className={`${styles("16-title")} ${
          isShare ? "text-[#40BAFF]" : "text-white"
        } text-center`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ContentButton;

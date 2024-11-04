import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const NavButton = ({
  text,
  isDisabled = false,
  marginBottm = null,
  handleNavigate,
}) => {
  return (
    <TouchableOpacity
      className={`mb-${marginBottm} py-3.5 rounded-[10px] ${
        isDisabled ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
      }`}
      onPress={handleNavigate}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <Text className={`${styles("16-title")} text-[#FFFFFF] text-center`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NavButton;

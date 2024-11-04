import { forwardRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import SelectIcon from "../../assets/images/icons/select.svg";
import styles from "../styles/styles";

const SchoolSelect = ({ inputSelect }, ref) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-3 border-[1px] border-[#D3D3D3] rounded-[10px]"
      onPress={() => ref.current?.open()}
      activeOpacity={0.7}
    >
      <Text className={`${styles("16-text")} text-[#111111]`}>
        {inputSelect ? inputSelect[1] : "학교를 선택해주세요!"}
      </Text>
      <SelectIcon />
    </TouchableOpacity>
  );
};

export default forwardRef(SchoolSelect);

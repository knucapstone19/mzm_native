import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CheckIcon from "../../assets/images/icons/check.svg";
import styles from "../styles/styles";

const MbtiQuestion = ({ num, question, rating, prop, res, sendRes }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [3, 2, 1, 0, -1, -2, -3];

  const updateArray = (option) => {
    const newArray = [...res];
    newArray[num] = [prop, option * rating];
    sendRes(newArray);
  };

  return (
    <View className="pb-8">
      <View className="items-center space-y-8">
        <View className="w-44 border-[0.5px] border-[#D3D3D3]" />
        <Text className={`mb-4 ${styles("14-title")} text-[#111111]`}>
          {question}
        </Text>
      </View>
      <View className="flex-row justify-center items-center space-x-1.5">
        {options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={{
              padding:
                selectedOption === option
                  ? (Math.abs(option) + 0.5) * 4
                  : (Math.abs(option) + 3) * 4,
            }}
            className={`${
              selectedOption !== option
                ? "bg-white"
                : selectedOption > 0
                ? "bg-[#65C77B]/30"
                : selectedOption < 0
                ? "bg-[#C74040]/30"
                : "bg-[#383838]/30"
            } ${
              option > 0
                ? "border-[#65C77B]"
                : option < 0
                ? "border-[#C74040]"
                : "border-[#383838]"
            } border-2 rounded-full`}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedOption(option);
              updateArray(option);
            }}
          >
            {selectedOption === option && <CheckIcon />}
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-between px-1 mt-1.5">
        <Text className={`${styles("12-text")} text-[#383838]`}>동의</Text>
        <Text className={`${styles("12-text")} text-[#383838]`}>비동의</Text>
      </View>
    </View>
  );
};

export default MbtiQuestion;

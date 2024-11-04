import { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DeleteIcon from "../../assets/images/icons/delete.svg";
import styles from "../styles/styles";

const UsernameInput = ({ inputText, setInputText, isDisabled, message }) => {
  const localRef = useRef(null);

  return (
    <>
      <View
        className={`flex-row justify-between items-center h-[42px] border-b-[1px] ${
          isDisabled ? "border-[#EC2222]" : "border-[#D3D3D3]"
        }`}
      >
        <TextInput
          ref={localRef}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="닉네임 (2~10자, 영문, 숫자 사용 가능)"
          placeholderTextColor="#A9A9A9"
          textAlignVertical="center"
          className="w-80 ml-1 font-normal text-base tracking-normal leading-[22.4px] text-[#111111]"
        />
        {inputText && (
          <TouchableOpacity
            className="mr-2"
            onPress={() => setInputText("")}
            activeOpacity={0.7}
          >
            <DeleteIcon />
          </TouchableOpacity>
        )}
      </View>
      {isDisabled && (
        <Text className={`mt-2 ${styles("14-text")} text-[#EC2222]`}>
          {message}
        </Text>
      )}
    </>
  );
};

export default UsernameInput;

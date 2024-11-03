import { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopBar from "../components/TopBar";
import DeleteIcon from "../../assets/images/icons/delete.svg";
import styles from "../styles/styles";

const NicknameForm = () => {
  const [inputText, setInputText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const navigation = useNavigation();

  const handleNavigate = async () => {
    try {
      await AsyncStorage.setItem("@user_name", inputText);
      navigation.navigate("School");
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("닉네임을 입력해주세요.", "");
    });
  }, [navigation]);

  useEffect(() => {
    let isDuplicated = null;
    const checkError = async () => {
      try {
        const res = await fetch(
          `http://211.243.47.122:3005/user/duplicate-name?name=${inputText}`
        );
        isDuplicated = await res.json();
      } catch (e) {
        console.error(e.message);
      }

      if (inputText.length < 2 || inputText.length > 10) {
        setIsDisabled(true);
        setMessage("2 ~ 10자 사이로 입력해주세요.");
      } else if (/[!@#\$%\^\&*\)\(+=._-]|[\s]/.test(inputText)) {
        setIsDisabled(true);
        setMessage("‘_’ 이외의 특수문자 입력은 불가합니다.");
      } else if (isDuplicated) {
        setIsDisabled(true);
        setMessage("중복된 닉네임입니다.");
      } else {
        setIsDisabled(false);
      }
    };
    checkError();
  }, [inputText]);

  return (
    <View className="flex-1 bg-white">
      <TopBar />
      <View className="flex-1 flex-col justify-between p-6">
        <View>
          <Text className={`mb-10 ${styles("bold-20-title")} text-[#111111]`}>
            사용하실 닉네임을 입력해주세요!
          </Text>
          <View
            className={`flex-row justify-between items-center h-[42px] border-b-[1px] ${
              isDisabled ? "border-[#EC2222]" : "border-[#D3D3D3]"
            }`}
          >
            <TextInput
              ref={inputRef}
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              placeholder="닉네임 (2~10자, 영문, 숫자 사용 가능)"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              className="ml-1 font-normal text-base tracking-normal leading-[22.4px] text-[#111111]"
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
        </View>
        <TouchableOpacity
          className={`py-3.5 rounded-[10px] ${
            isDisabled ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          }`}
          onPress={handleNavigate}
          activeOpacity={0.7}
          disabled={isDisabled}
        >
          <Text className={`${styles("16-title")} text-[#FFFFFF] text-center`}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NicknameForm;

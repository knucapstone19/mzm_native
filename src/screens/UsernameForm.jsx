import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import checkDuplicateName from "../hooks/checkDuplicateName";
import UsernameInput from "../ui/UsernameInput";
import TopBar from "../components/TopBar";
import NavButton from "../components/NavButton";
import styles from "../styles/styles";

const UsernameForm = () => {
  const [inputText, setInputText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
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
    checkDuplicateName(inputText, setIsDisabled, setMessage);
  }, [inputText]);

  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("닉네임을 입력해주세요.", "");
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-white">
      <TopBar />
      <View className="flex-1 flex-col justify-between p-6">
        <View>
          <Text className={`mb-10 ${styles("bold-20-title")} text-[#111111]`}>
            사용하실 닉네임을 입력해주세요!
          </Text>
          <UsernameInput
            inputText={inputText}
            setInputText={setInputText}
            isDisabled={isDisabled}
            message={message}
          />
        </View>
        <NavButton
          text="다음"
          isDisabled={isDisabled}
          handleNavigate={handleNavigate}
        />
      </View>
    </View>
  );
};

export default UsernameForm;

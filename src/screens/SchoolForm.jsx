import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import patchUser from "../hooks/patchUser";
import getSchoolData from "../hooks/getSchoolData";
import SchoolSelect from "../ui/SchoolSelect";
import TopBar from "../components/TopBar";
import NavButton from "../components/NavButton";
import SchoolBottomSheet from "../components/SchoolBottomSheet";
import styles from "../styles/styles";

const SchoolForm = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [inputSelect, setInputSelect] = useState(null);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const updateProfile = async () => {
    const userName = await AsyncStorage.getItem("@user_name");

    try {
      await patchUser(userName, inputSelect);
      navigation.replace("Main");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSchoolData(setSchoolData);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <View className="flex-1 flex-col justify-between p-6">
        <View>
          <Text className={`mb-10 ${styles("bold-20-title")} text-[#111111]`}>
            재학중인 학교를 선택해주세요!
          </Text>
          <SchoolSelect ref={modalizeRef} inputSelect={inputSelect} />
        </View>
        <NavButton
          text="완료"
          isDisabled={!inputSelect}
          handleNavigate={updateProfile}
        />
      </View>

      <SchoolBottomSheet
        ref={modalizeRef}
        schoolData={schoolData}
        setInputSelect={setInputSelect}
      />
    </GestureHandlerRootView>
  );
};

export default SchoolForm;

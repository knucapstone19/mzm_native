import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import patchUser from "../hooks/patchUser";
import getSchoolData from "../hooks/getSchoolData";
import checkDuplicateName from "../hooks/checkDuplicateName";
import ProfileModSector from "../ui/ProfileModSector";
import TopBar from "../components/TopBar";
import SchoolBottomSheet from "../components/SchoolBottomSheet";
import styles from "../styles/styles";

const ProfileModScreen = ({ route }) => {
  const { profileData } = route.params;
  const [schoolData, setSchoolData] = useState([]);
  const [url, setUrl] = useState(profileData[0]);
  const [userName, setUserName] = useState(profileData[1]);
  const [school, setSchool] = useState([profileData[2], profileData[3]]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const updateProfile = async () => {
    try {
      await patchUser(userName, school, profileData[1]);
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSchoolData(setSchoolData);
  }, []);

  useEffect(() => {
    checkDuplicateName(userName, setIsDisabled, setMessage, profileData[1]);
  }, [userName]);

  return (
    <GestureHandlerRootView className="flex-1">
      <TopBar
        title="프로필 수정"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View className="items-center px-6 pt-10">
        <ProfileModSector
          ref={modalizeRef}
          url={url}
          userName={userName}
          setUserName={setUserName}
          school={school}
          isDisabled={isDisabled}
          message={message}
        />
        <TouchableOpacity
          className={`w-full mt-10 py-3.5 rounded-[10px] ${
            isDisabled ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          }`}
          onPress={updateProfile}
          activeOpacity={0.7}
          disabled={isDisabled}
        >
          <Text className={`${styles("16-title")} text-[#FFFFFF] text-center`}>
            완료
          </Text>
        </TouchableOpacity>
      </View>

      <SchoolBottomSheet
        ref={modalizeRef}
        schoolData={schoolData}
        setInputSelect={setSchool}
      />
    </GestureHandlerRootView>
  );
};

export default ProfileModScreen;

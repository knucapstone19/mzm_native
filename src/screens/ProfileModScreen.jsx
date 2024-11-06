import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import patchUser from "../hooks/patchUser";
import patchImage from "../hooks/patchImage";
import getSchoolData from "../hooks/getSchoolData";
import checkDuplicateName from "../hooks/checkDuplicateName";
import ProfileModSector from "../ui/ProfileModSector";
import TopBar from "../components/TopBar";
import SchoolBottomSheet from "../components/SchoolBottomSheet";
import styles from "../styles/styles";
import NavButton from "../components/NavButton";

const ProfileModScreen = ({ route }) => {
  const { profileData } = route.params;
  console.log(profileData[0]);
  const [schoolData, setSchoolData] = useState([]);
  const [url, setUrl] = useState(profileData[0]);
  const [userName, setUserName] = useState(profileData[1]);
  const [school, setSchool] = useState([profileData[2], profileData[3]]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, (url) => {
      if (url.didCancel) {
        console.log("User cancelled image picker");
      } else if (url.error) {
        console.log("ImagePicker Error: ", url.error);
      } else {
        setUrl(url.assets[0]);
      }
    });
  };

  const updateProfile = async () => {
    try {
      await patchUser(userName, school, profileData[1]);
      await patchImage(profileData[0], url);
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
          image={profileData[0]}
          handleChoosePhoto={handleChoosePhoto}
          userName={userName}
          setUserName={setUserName}
          school={school}
          isDisabled={isDisabled}
          message={message}
        />
        <NavButton
          text="완료"
          widthFull={true}
          marginTop={10}
          handleNavigate={updateProfile}
        />
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

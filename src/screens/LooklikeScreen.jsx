import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import TopBar from "../components/TopBar";
import UploadIcon from "../../assets/images/icons/upload.svg";
import styles from "../styles/styles";

const LooklikeScreen = () => {
  const [url, setUrl] = useState(null);
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
      console.log(url);
    });
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (url) {
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: url.uri,
            type: url.type,
            name: url.fileName,
          });

          const res = await fetch(
            "http://58.234.90.197:3005/contents/predict",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          console.log(data);
          navigation.navigate("LooklikeRes", { data: data.face_shape });
          console.log(data);
        } catch (e) {
          console.error(e.message);
        }
      }
    };
    uploadImage();
  }, [url]);

  return (
    <View className="flex-1 items-center bg-white">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <View className="px-16">
        <View className="items-center space-y-2 mt-4 mb-32">
          <Text className={`${styles("24-title")} text-[#111111]`}>
            닮은 꼴 AI 테스트
          </Text>
          <Text className={`${styles("14-text")} text-[383838]`}>
            나와 닮은 모양은?
          </Text>
        </View>
        <TouchableOpacity
          className="items-center space-y-4 p-9 border-dashed border-[1px] border-[#D3D3D3] rounded-[10px]"
          onPress={handleChoosePhoto}
          activeOpacity={0.8}
        >
          <Image source={require("../../assets/images/hamburger.png")} />
          <View className="items-center space-y-1">
            <UploadIcon />
            <Text className={`${styles("16-text")} text-[#A9A9A9]`}>
              얼굴 사진을 업로드해주세요!
            </Text>
          </View>
        </TouchableOpacity>
        <Text className={`mt-6 ${styles("12-text")} text-[#A9A9A9]`}>
          ※ 개인정보 보호를 위해 사용자의 이미지를 업로드할 때 사용자의
          개인정보를 저장하지 않습니다.
        </Text>
      </View>
    </View>
  );
};

export default LooklikeScreen;

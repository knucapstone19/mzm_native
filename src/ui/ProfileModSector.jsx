import { forwardRef } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";

const ProfileModSector = (
  {
    url,
    image,
    handleChoosePhoto,
    userName,
    setUserName,
    school,
    isDisabled,
    message,
  },
  ref
) => {
  return (
    <>
      <TouchableOpacity
        className="rounded-full border-4 border-white"
        onPress={handleChoosePhoto}
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri:
              url !== image
                ? url.uri
                : `http://211.243.47.122:3005/user/profile-image?path=${image}`,
          }}
          className="w-28 h-28 rounded-full"
        />
      </TouchableOpacity>

      <View className="w-full mt-10">
        <View
          className={`flex-col p-4 border-[1px] ${
            isDisabled ? "border-[#EC2222]" : "border-[#D3D3D3]"
          } rounded-t-[10px] bg-white`}
        >
          <View className="flex-row items-center">
            <Text
              className={`${styles("14-text")} ${
                isDisabled ? "text-[#EC2222]" : "text-[#111111]"
              }`}
            >
              닉네임
            </Text>
            <TextInput
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              placeholder="닉네임을 입력해주세요"
              className="font-normal text-base tracking-normal leading-[22.4px] text-[#111111] w-56 pl-1 py-0 absolute left-20"
            />
          </View>
          {isDisabled && (
            <Text
              className={`ml-20 mt-2 pl-1 ${styles("12-text")} text-[#EC2222]`}
            >
              {message}
            </Text>
          )}
        </View>

        <View className="flex-row items-center p-4 border-x-[1px] border-b-[1px] border-[#D3D3D3] rounded-b-[10px] bg-white">
          <Text className={`${styles("14-text")} text-[#111111]`}>
            학교 정보
          </Text>
          <TouchableOpacity
            className="w-56 pl-1 absolute left-24"
            onPress={() => ref.current?.open()}
          >
            <Text className={`${styles("16-text")} text-[#111111]`}>
              {school[1]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default forwardRef(ProfileModSector);

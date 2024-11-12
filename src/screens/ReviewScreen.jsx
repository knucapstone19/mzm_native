import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";
import { useEffect, useRef, useState } from "react";
import NavButton from "../components/NavButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewScreen = ({ route }) => {
  const { storeId } = route.params;
  const [rating, setRating] = useState(Array.from({ length: 5 }, () => false));
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(text);
    console.log(rating.filter((v) => v).length);
    // console.log(rating.filter((v) => !v).length);
  }, [rating]);

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <View className="flex-1 justify-between h-full px-4 pt-[14px]">
        <View>
          <Text className={`${styles("bold-20-title")} text-[#111111]`}>
            식당 리뷰하기
          </Text>
          <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
            다른 사람들에게 의견을 알려주세요
          </Text>
          <View className="flex-row justify-around my-4 py-2">
            {Array.from(
              { length: rating.filter((v) => v).length },
              (_, idx) => (
                <TouchableOpacity
                  key={idx.toString()}
                  onPress={() =>
                    setRating(() =>
                      Array.from({ length: 5 }, (_, i) => i <= idx)
                    )
                  }
                  activeOpacity={0.8}
                >
                  <FullStarIcon width={32} height={32} />
                </TouchableOpacity>
              )
            )}
            {Array.from(
              { length: rating.filter((v) => !v).length },
              (_, idx) => (
                <TouchableOpacity
                  key={idx.toString()}
                  onPress={() =>
                    setRating(() =>
                      Array.from(
                        { length: 5 },
                        (_, i) => i <= idx + rating.filter((v) => v).length
                      )
                    )
                  }
                  activeOpacity={0.8}
                >
                  <EmptyStarIcon width={32} height={32} />
                </TouchableOpacity>
              )
            )}
          </View>
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder="식당에 대한 리뷰를 작성해주세요!"
            placeholderTextColor="#A9A9A9"
            multiline={true}
            style={{ textAlignVertical: "top", elevation: 1 }}
            className="h-[120px] pl-3 pt-[14px] font-normal text-base tracking-normal leading-[22.4px] text-[#111111] rounded bg-white"
          />
        </View>
        <NavButton
          text="완료"
          isDisabled={!rating.filter((v) => v).length || !text}
          marginBottom={4}
          handleNavigate={async () => {
            const token = await AsyncStorage.getItem("@user_token");
            const res = await fetch(
              `http://211.243.47.122:3005/store/${storeId}/review`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: text,
                  rate: rating.filter((v) => v).length,
                }),
              }
            );
            const data = await res.json();
            console.log(data);

            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;

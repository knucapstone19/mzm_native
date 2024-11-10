import { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import NavButton from "../components/NavButton";
import styles from "../styles/styles";

const FilterBottomSheet = ({ selectedFilter, setSelectedFilter }, ref) => {
  const localRef = useRef(null);
  const filterArray = ["인기순", "평점순", "거리순"];

  useImperativeHandle(ref, () => ({
    open: () => {
      localRef.current?.open();
    },
    close: () => {
      localRef.current?.close();
    },
  }));

  return (
    <Modalize
      ref={localRef}
      snapPoint={260}
      handlePosition="inside"
      avoidKeyboardLikeIOS={true}
      HeaderComponent={<View className="pt-12" />}
      // keyboardAvoidingBehavior={Platform.OS === "ios" ? undefined : "height"}
    >
      <ScrollView className="px-6">
        <View className="justify-center items-center">
          {filterArray.map((filter, idx) => (
            <TouchableOpacity
              key={idx.toString()}
              className={`w-full py-2.5 rounded-[10px] ${
                selectedFilter === filter && "bg-[#F0F0F0]"
              }`}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                className={`${styles("14-text")} text-[#111111] text-center`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <NavButton
          text="완료"
          marginTop={4}
          handleNavigate={() => localRef.current.close()}
        />
      </ScrollView>
    </Modalize>
  );
};

export default forwardRef(FilterBottomSheet);

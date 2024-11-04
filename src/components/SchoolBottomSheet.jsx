import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import styles from "../styles/styles";

const SchoolBottomSheet = ({ schoolData, setInputSelect }, ref) => {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      localRef.current?.open();
    },
    close: () => {
      localRef.current?.close();
    },
  }));

  const handleSelect = (school) => {
    setInputSelect(school);
    localRef.current?.close();
  };

  return (
    <Modalize
      ref={localRef}
      snapPoint={400}
      handlePosition="inside"
      avoidKeyboardLikeIOS={true}
      HeaderComponent={
        <View className="pt-6">
          <Text
            className={`pt-6 pb-4 ${styles(
              "bold-20-title"
            )} text-[#111111] text-center`}
          >
            학교를 선택하세요!
          </Text>
        </View>
      }
      // keyboardAvoidingBehavior={Platform.OS === "ios" ? undefined : "height"}
    >
      <ScrollView>
        <FlatList
          data={schoolData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              className="px-6 py-[17px]"
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
            >
              <Text className={`${styles("16-text")} text-[#111111]`}>
                {item[1]}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, idx) => idx.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </Modalize>
  );
};

export default forwardRef(SchoolBottomSheet);

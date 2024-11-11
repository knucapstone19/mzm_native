import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import SearchIcon from "../../assets/images/icons/search.svg";

const SearchBar = (
  { border = true, setSearchText = () => {}, handlePress = () => {} },
  ref
) => {
  const [text, setText] = useState("");
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (localRef.current) {
        localRef.current?.focus();
      }
    },
  }));

  return (
    <View
      className={`flex-row items-center w-full h-[50px] space-x-0.5 pl-4 ${
        border ? "border-[1px] border-[#FF8800]" : null
      } rounded-md bg-white`}
    >
      <SearchIcon />
      <TextInput
        ref={localRef}
        value={text}
        onChangeText={(text) => setText(text)}
        onPress={handlePress}
        returnKeyType="search"
        onSubmitEditing={(e) => setSearchText(e.nativeEvent.text)}
        placeholder="찾으시는 메뉴를 검색하세요!"
        placeholderTextColor="#A9A9A9"
        textAlignVertical="center"
        className="font-normal text-base tracking-normal leading-[22.4px] text-[#111111]"
      />
    </View>
  );
};

export default forwardRef(SearchBar);

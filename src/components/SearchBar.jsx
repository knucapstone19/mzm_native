import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { View, TextInput } from "react-native";
import SearchIcon from "../../assets/images/icons/search.svg";

const SearchBar = ({ press = () => {}, border = true }, ref) => {
  const [searchText, setSearchText] = useState("");
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
      className={`flex-row items-center h-[50px] pl-4 space-x-0.5 ${
        border ? "border-[1px] border-[#FF8800]" : null
      } rounded-md`}
    >
      <SearchIcon />
      <TextInput
        ref={localRef}
        className="font-normal text-base leading-[22.4px] tracking-normal text-[#111111]"
        onPress={press}
        placeholder="찾으시는 메뉴를 검색하세요!"
        placeholderTextColor="#A9A9A9"
        textAlignVertical="center"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>
  );
};

export default forwardRef(SearchBar);

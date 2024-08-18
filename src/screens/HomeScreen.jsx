import { View, Text, FlatList, ScrollView } from "react-native";
import MainTopBar from "../components/MainTopBar";
import CategoryItem from "../components/CategoryItem";
import MainSector from "../components/MainSector";
import styles from "../styles/styles";

//TODO: 백엔드에서 데이터를 가져와서 뿌릴지 아니면 이대로 사용할 지 얘기를 해봐야 할듯
const CATEGORY_COLUMNS = 5;
const CATEGORY_DATA = [
  { src: require(`../../assets/images/category/k-food.png`), text: "한식" },
  { src: require(`../../assets/images/category/j-food.png`), text: "일식" },
  { src: require(`../../assets/images/category/c-food.png`), text: "중식" },
  { src: require(`../../assets/images/category/s-food.png`), text: "분식" },
  {
    src: require(`../../assets/images/category/chicken.png`),
    text: "치킨",
    isSmall: true,
  },
  {
    src: require(`../../assets/images/category/hamburger.png`),
    text: "햄버거",
  },
  {
    src: require(`../../assets/images/category/pizza.png`),
    text: "피자",
    isSmall: true,
  },

  {
    src: require(`../../assets/images/category/dessert.png`),
    text: "디저트",
    isSmall: true,
  },
];

const SECTOR_COLUMNS = 2;
const SECTOR_DATA = [
  {
    title: "주변 추천 맛집",
    parts: [
      { text: "주변에서 " },
      { text: "추천", color: "#D9DD3B" },
      { text: "해주는\n 맛집을 만나보세요!" },
    ],
    src: require(`../../assets/images/3d/fire.png`),
    width: "50",
  },
  {
    title: "맛집 리스트업",
    parts: [
      { text: "학교 주변에 있는" },
      { text: " 전체", color: "#EC2222" },
      { text: "\n식당들을 만나보세요!" },
    ],
    src: require(`../../assets/images/3d/file-text.png`),
    width: "50",
  },
  {
    title: "음식 MBTI",
    parts: [{ text: "당신의 음식\n취향은?" }],
    src: require(`../../assets/images/3d/heart.png`),
    width: "33.33",
  },
  {
    title: "음식 닮은꼴 AI 테스트",
    parts: [{ text: "자신의 셀카를 업로드하고\n 닮은 음식을 알아보아요!" }],
    src: require(`../../assets/images/3d/camera.png`),
    width: "66.66",
  },
  {
    title: "음식 이상형 월드컵",
    parts: [
      {
        text: "둘중 좋아하는 음식을 선택해서 가장\n좋아하는 음식을 알아보아요!",
      },
    ],
    src: require(`../../assets/images/3d/crow.png`),
    isBig: true,
    width: "100",
  },
];

const HomeScreen = () => {
  return (
    <View>
      <MainTopBar />
      <ScrollView
        className="px-6 mt-[125px]"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            shadowRadius: 10,
            elevation: 1,
            backgroundColor: "transparent",
            borderRadius: 10,
          }}
          className="mt-5 mb-2"
        >
          <View className="bg-white flex flex-col pt-[14px] pb-4 px-4 rounded-[10px]">
            <Text className={`mb-2 ${styles("main")} text-[#111111]`}>
              메뉴 별 카테고리
            </Text>
            <FlatList
              data={CATEGORY_DATA}
              renderItem={({ item, index }) => (
                <CategoryItem
                  src={item.src}
                  text={item.text}
                  isSmall={item.isSmall}
                  idx={index}
                />
              )}
              keyExtractor={(_, idx) => idx.toString()}
              numColumns={CATEGORY_COLUMNS}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </View>
        </View>
        <FlatList
          className="mb-2"
          data={SECTOR_DATA}
          renderItem={({ item, index }) => (
            <MainSector
              title={item.title}
              parts={item.parts}
              src={item.src}
              isBig={item.isBig}
              width={item.width}
              idx={index}
            />
          )}
          keyExtractor={(_, idx) => idx.toString()}
          numColumns={SECTOR_COLUMNS}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

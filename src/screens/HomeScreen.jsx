import { View, FlatList, ScrollView } from "react-native";
import MainTopBar from "../ui/MainTopBar";
import CategorySector from "../ui/CategorySector";
import MainSector from "../components/MainSector";
import SectorData from "../json/sectorData.json";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SECTOR_COLS = 2;
const SECTOR_IMAGES = {
  "fire.png": require("../../assets/images/3d/fire.png"),
  "file-text.png": require("../../assets/images/3d/file-text.png"),
  "heart.png": require("../../assets/images/3d/heart.png"),
  "camera.png": require("../../assets/images/3d/camera.png"),
  "crow.png": require("../../assets/images/3d/crow.png"),
};

const HomeScreen = () => {
  const sectorData = SectorData.map((item) => ({
    ...item,
    src: SECTOR_IMAGES[item.src],
  }));

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      let data = null;

      if (token) {
        try {
          const res = await fetch("http://211.243.47.122:3005/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          data = await res.json();
          // console.log(data);
        } catch (e) {
          console.error(e.message);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <MainTopBar />
      <ScrollView
        className="px-6 mt-[125px]"
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <CategorySector />
        <FlatList
          className="mb-2"
          data={sectorData}
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
          numColumns={SECTOR_COLS}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

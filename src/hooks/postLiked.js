import AsyncStorage from "@react-native-async-storage/async-storage";

const postLiked = async (storeId) => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    const res = await fetch(
      `http://211.243.47.122:3005/store/${storeId}/liked`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default postLiked;

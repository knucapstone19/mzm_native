import AsyncStorage from "@react-native-async-storage/async-storage";

const postMbtiHistory = async (resType) => {
  const token = await AsyncStorage.getItem("@user_token");
  try {
    const res = await fetch(
      `http://211.243.47.122:3005/mbti/history?mbti=${resType}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default postMbtiHistory;

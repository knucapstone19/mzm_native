import AsyncStorage from "@react-native-async-storage/async-storage";

const postReview = async (storeId, rating, text) => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    const res = await fetch(
      `http://58.234.90.197:3005/store/${storeId}/review`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
          rates: rating.filter((v) => v).length,
        }),
      }
    );

    await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default postReview;

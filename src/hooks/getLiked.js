import AsyncStorage from "@react-native-async-storage/async-storage";

const getLiked = async (storeId) => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    const res = await fetch(
      `http://58.234.90.197:3005/store/${storeId}/liked`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = false;
    if (res.ok) {
      data = await res.json();
    } else {
      data = false;
    }

    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getLiked;

import AsyncStorage from "@react-native-async-storage/async-storage";

const getLikedStore = async (setStoreArray) => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    const res = await fetch(`http://211.243.47.122:3005/profiles/liked`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setStoreArray(data);
  } catch (e) {
    console.error(e.message);
  }
};

export default getLikedStore;

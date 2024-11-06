import AsyncStorage from "@react-native-async-storage/async-storage";

const patchImage = async (prevUrl, url) => {
  if (url !== prevUrl) {
    const token = await AsyncStorage.getItem("@user_token");
    const formData = new FormData();
    formData.append("file", {
      uri: url.uri,
      type: "image/jpeg",
      name: "profile-image.jpg",
    });

    const res = await fetch("http://211.243.47.122:3005/user/profile-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    await res.text();
  }
};

export default patchImage;

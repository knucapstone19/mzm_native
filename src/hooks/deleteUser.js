import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteUser = async () => {
  const token = await AsyncStorage.getItem("@user_token");

  try {
    const res = await fetch("http://211.243.47.122:3005/user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("서버 응답이 올바르지 않습니다.");
    }

    await res.json();
  } catch (error) {
    console.error("유저 정보 삭제 중 오류 발생:", error);
  }
};

export default deleteUser;

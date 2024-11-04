import AsyncStorage from "@react-native-async-storage/async-storage";

const patchUser = async (userName, school, prev = null) => {
  const token = await AsyncStorage.getItem("@user_token");

  const updatedData = {
    schoolId: school[0],
  };

  if (userName !== prev) {
    updatedData.username = userName;
  }

  try {
    const res = await fetch("http://211.243.47.122:3005/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("서버 응답이 올바르지 않습니다.");
    }

    await res.json();
  } catch (error) {
    console.error("유저 정보 업데이트 중 오류 발생:", error);
  }
};

export default patchUser;

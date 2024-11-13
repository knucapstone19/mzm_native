import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

const MbtiItem = ({ title, createdAt, description }) => {
  const [date, setDate] = useState(null);

  const pastDate = new Date(createdAt);
  const currentDate = new Date();

  let result = "";
  const calcDate = () => {
    const diffInMs = currentDate - pastDate;

    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInYears > 0) {
      result = `${diffInYears}년`;
    } else if (diffInMonths > 0) {
      result = `${diffInMonths}개월`;
    } else if (diffInDays > 0) {
      result = `${diffInDays}일`;
    } else if (diffInHours > 0) {
      result = `${diffInHours}시간`;
    } else if (diffInMinutes > 0) {
      result = `${diffInMinutes}분`;
    } else {
      result = `${diffInSeconds}초`;
    }
    setDate(result);
  };

  useEffect(() => {
    calcDate();
  }, []);

  return (
    <View className="space-y-4 px-4 pt-[14px] pb-4 bg-white">
      <View className="flex-row space-x-2">
        <Text className={`${styles("24-title")} text-[#111111]`}>{title}</Text>
        <Text className={`mt-2 ${styles("12-text")} text-[#A9A9A9]`}>
          {date} 전
        </Text>
      </View>
      <Text>{description}</Text>
    </View>
  );
};

export default MbtiItem;

const getCategoryStore = async (location, category, page) => {
  try {
    const res = await fetch(
      `http://58.234.90.197:3005/store/search?latitude=${location[0]}&longitude=${location[1]}&page=${page}`
    );
    const data = await res.json();

    const categoriesToExclude = [
      "한식",
      "일식",
      "중식",
      "분식",
      "양식",
      "치킨",
      "패스트푸드",
    ];
    if (category === "기타") {
      return data?.filter((v) => !categoriesToExclude.includes(v.categoryName));
    }
    return data?.filter((v) => category === v.categoryName);
  } catch (e) {
    console.error(e.message);
  }
};

export default getCategoryStore;

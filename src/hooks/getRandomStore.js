const getRandomStore = async (location, randomPage) => {
  try {
    const res = await fetch(
      `http://211.243.47.122:3005/store/search?latitude=${location[0]}&longitude=${location[1]}&page=${randomPage}`
    );
    return await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default getRandomStore;

const getStore = async (location, page) => {
  try {
    const res = await fetch(
      `http://58.234.90.197:3005/store/search?latitude=${location[0]}&longitude=${location[1]}&page=${page}`
    );
    return await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default getStore;

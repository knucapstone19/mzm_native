const getStoreDetail = async (storeId) => {
  try {
    const res = await fetch(`http://58.234.90.197:3005/store/${storeId}`);
    return await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default getStoreDetail;

const getStoreDetail = async (storeId) => {
  try {
    const res = await fetch(`http://211.243.47.122:3005/store/${storeId}`);
    return await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default getStoreDetail;

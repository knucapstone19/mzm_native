const getUser = async (token) => {
  try {
    const res = await fetch("http://211.243.47.122:3005/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.error(e.message);
  }
};

export default getUser;

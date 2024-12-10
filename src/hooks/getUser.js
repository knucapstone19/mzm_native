const getUser = async (token) => {
  try {
    const res = await fetch("http://58.234.90.197:3005/user", {
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

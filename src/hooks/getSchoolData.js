const getSchoolData = async (setSchoolData) => {
  try {
    const res = await fetch("http://211.243.47.122:3005/school");
    const data = await res.json();

    setSchoolData(
      data.map(({ schoolId, schoolName }) => [schoolId, schoolName])
    );
  } catch (e) {
    console.error(e.message);
  }
};

export default getSchoolData;

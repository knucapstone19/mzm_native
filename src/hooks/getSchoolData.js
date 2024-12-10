const getSchoolData = async (setSchoolData) => {
  try {
    const res = await fetch("http://58.234.90.197/school");
    const data = await res.json();

    setSchoolData(
      data.map(({ schoolId, schoolName }) => [schoolId, schoolName])
    );
  } catch (e) {
    console.error(e.message);
  }
};

export default getSchoolData;

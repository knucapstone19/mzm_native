const checkDuplicateName = async (
  userName,
  setIsDisabled,
  setMessage,
  profileData = null
) => {
  let isDuplicated = null;
  if (userName !== profileData) {
    try {
      const res = await fetch(
        `http://211.243.47.122:3005/user/duplicate-name?name=${userName}`
      );
      isDuplicated = await res.json();
    } catch (e) {
      console.error(e.message);
    }
  }

  if (userName.length < 2 || userName.length > 10) {
    setIsDisabled(true);
    setMessage("2 ~ 10자 사이로 입력해주세요.");
  } else if (/[!@#\$%\^\&*\)\(+=._-]|[\s]/.test(userName)) {
    setIsDisabled(true);
    setMessage("‘_’ 이외의 특수문자 입력은 불가합니다.");
  } else if (isDuplicated) {
    setIsDisabled(true);
    setMessage("중복된 닉네임입니다.");
  } else {
    setIsDisabled(false);
  }
};

export default checkDuplicateName;

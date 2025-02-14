const rest_api_key = "da2fc2acf5cf2bc61cca93f4e5e794da";
const redirect_uri = "http://localhost:5173/member/kakao";

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

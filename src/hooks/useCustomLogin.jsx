import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signinState } from "../atoms/signinState";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";

const useCustomLogin = () => {
  const [loginState, setLoginState] = useRecoilState(signinState);

  const resetState = useResetRecoilState(signinState);

  const navigate = useNavigate();

  const resetCartState = useResetRecoilState(cartState);

  const isLogin = loginState.email ? true : false; //----------로그인 여부

  const doLogin = async (loginParam) => {
    const result = await loginPost(loginParam);

    saveAsCookie(result);

    return result;
  };

  const saveAsCookie = (data) => {
    setCookie("member", JSON.stringify(data), 1);
    setLoginState(data);
  };

  const doLogout = () => {
    removeCookie("member");
    resetState();
    resetCartState();
  };

  const moveToPath = (path) => {
    //----------------페이지 이동
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    //----------------------로그인 페이지로 이동
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    //--------로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };
  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    saveAsCookie,
  };
};

export default useCustomLogin;

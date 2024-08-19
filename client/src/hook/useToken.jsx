import { jwtDecode } from "jwt-decode";

const useToken = () => {
  if (
    !window.location.pathname.includes("signin") &&
    !window.location.pathname.includes("signup")
  ) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const decodeToken = jwtDecode(token);

    // to see the remaining time of the token
    // const timeRemainingSecond = (decodeToken.exp * 1000 - Date.now()) / 1000;
    // const timeRemainingMinute = timeRemainingSecond / 60;

    const firstname = decodeToken?.firstname;
    return { firstname };
  }
};

export default useToken;

import { jwtDecode } from "jwt-decode";

const useToken = () => {
  if (
    !window.location.pathname.includes("signin") &&
    !window.location.pathname.includes("signup")
  ) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const firstname = decodeToken?.firstname;
    return { firstname };
  }
};

export default useToken;

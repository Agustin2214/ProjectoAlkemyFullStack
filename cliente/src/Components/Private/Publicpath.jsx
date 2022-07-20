import { Navigate } from "react-router-dom";

export function Publicpath({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const getToken = function () {
    if (user && user.token) {
      return user.token
    } else {
      return "NO_USER";
    }
  };
  let auxRole = getToken();

  function aux() {
    if (!"NO_USER") {
      return true;
    } else {
      return false;
    }
  }
  let auth = aux();

  return auth ? children : <Navigate to="/balance" />;
}
import { removeToken } from "../Auth/localStorage";
import { Navigate } from "react-router-dom";

export default function Logout() {
  removeToken();
  Navigate({to:"/"})
  return <div></div>;
}

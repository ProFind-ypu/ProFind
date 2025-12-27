import * as React from "react";
import { removeToken } from "../Auth/localStorage";

export default function Logout() {
  removeToken();

  return <div></div>;
}

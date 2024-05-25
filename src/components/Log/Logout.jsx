import axios from "axios";
import React, { useState } from "react";
import cookie from "js-cookie";
const Logout = () => {
  const logout = async () => {
    const removeCookie = key => {
      if (window !== "undefined") cookie.remove(key, { expires: 1 });
    };
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}api/user/logout`,
      withCredentials: true
    })
      .then(() => removeCookie("jwt"))
      .catch(err => console.log(err));
    window.location = "/";
  };
  return (
    <div>
      <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout" />
      </li>
    </div>
  );
};

export default Logout;

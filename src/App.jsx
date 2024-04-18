import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";

const App = () => {
  const [uid, setUid] = useState(null);
  const url = `${import.meta.env.VITE_API_URL}jwtid`;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchToken() {
      await axios({
        method: "get",
        url,
        withCredentials: true
      })
        .then(res => {
          setUid(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;

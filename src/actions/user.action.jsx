import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = uid => {
  return dispatch => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}api/user/${uid}`)
      .then(res => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return async dispatch => {
    try {
      return await axios
        .post(`${import.meta.env.VITE_API_URL}api/user/upload`, data)
        .then(res => {
          // if (res.data.errors) {
          //   dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          // } else {
          //   dispatch({ type: GET_USER_ERRORS, payload: "" });
          // }
          dispatch({
            type: UPLOAD_PICTURE,
            payload: res.data.picture
          });
        });
    } catch (postError) {
      console.error("Error during POST:", postError.message);
    }

    // try {
    //   return await axios
    //     .get(`${import.meta.env.VITE_API_URL}api/user/${id}`)
    //     .then(res => {
    //       dispatch({ type: GET_USER_DATA, payload: res.data.picture });
    //     });
    // } catch (getError) {
    //   console.error("Error during GET:", getError.message);
    // }
  };
};

export const updateBio = (userId, bio) => {
  return dispatch => {
    return axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}api/user/` + userId,
      data: { bio }
    })
      .then(res => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch(err => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}api/user/follow/` + followerId,
      data: { idToFollow }
    })
      .then(res => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch(e => console.log(e));
  };
};
export const unFollowUser = (followerId, idToUnfollow) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow }
    })
      .then(res => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch(e => console.log(e));
  };
};

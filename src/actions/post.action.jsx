import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POSTS = "ADD_POSTS";

export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//trends
export const GET_TRENDS = "GET_TRENDS";

//errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export function getPosts(num) {
  return dispatch => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}api/post/`)
      .then(res => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch(e => console.log(e));
  };
}
export function addPost(data) {
  return dispatch => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}api/post/`, data)
      .then(res => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
}

export const likePost = (postId, userId) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}api/post/like-post/` + postId,
      data: { id: userId }
    })
      .then(res => dispatch({ type: LIKE_POST, payload: { postId, userId } }))
      .catch(e => console.log(e));
  };
};
export const unlikePost = (postId, userId) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId }
    })
      .then(res => dispatch({ type: UNLIKE_POST, payload: { postId, userId } }))
      .catch(e => console.log(e));
  };
};
export const updatePost = (postId, message) => {
  return dispatch => {
    return axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}api/post/${postId}`,
      data: { message }
    })
      .then(res =>
        dispatch({ type: UPDATE_POST, payload: { message, postId } })
      )
      .catch(e => console.log(e));
  };
};
export const deletePost = postId => {
  return dispatch => {
    return axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}api/post/${postId}`
    })
      .then(res => dispatch({ type: DELETE_POST, payload: { postId } }))
      .catch(e => console.log(e));
  };
};

export const addComment = (postId, commenterId, commenterPseudo, text) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_URL}api/post/post-comment/${postId}`,
      data: { commenterId, commenterPseudo, text }
    })
      .then(res => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch(e => {
        console.log(e);
      });
  };
};
export const editComment = (postId, commentId, text) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${
        import.meta.env.VITE_API_URL
      }api/post/edit-post-comment/${postId}`,
      data: { commentId, text }
    })
      .then(res => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch(e => console.log(e));
  };
};
export const deleteComment = (postId, commentId) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${
        import.meta.env.VITE_API_URL
      }api/post/delete-post-comment/${postId}`,
      data: { commentId }
    })
      .then(res => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch(e => console.log(e));
  };
};

export const getTrends = sortedArray => {
  return dispatch => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};

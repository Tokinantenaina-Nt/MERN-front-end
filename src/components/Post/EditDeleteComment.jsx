import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { deleteComment, editComment } from "../../actions/post.action";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  const handleEdit = e => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };
  const handleDelete = e => {
    dispatch(deleteComment(postId, comment._id));
  };
  useEffect(() => {
    if (uid === comment.commenterId) {
      setIsAuthor(true);
    }
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label
            htmlFor="text"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={e => {
              setText(e.target.value);
            }}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};
export default EditDeleteComment;

import { useState } from "react";
import TodoModal from "./TodoModal";
import axios from "../../api/axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const TODO_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos";
const access_token = localStorage.getItem("token");

const TodoEdit = (props) => {
  
  const [updateNeeded, setUpdateNeeded] = useState(false);

  const deleteTodoAPI = (id) => {
    axios
      .delete(`${TODO_URL}/${props.id}`, {
        headers: { Authorization: "Bearer " + access_token },
      })
  };

  const deleteTodo = (id) => {
    deleteTodoAPI(id);
  };

  return (
    <>
      {updateNeeded ? (
        <>
        <div
          style={{
            position: "absolute",
            marginLeft: "400px",
            marginRight: "0px",
          }}
        >
          <ModeEditOutlineIcon
            onClick={setUpdateNeeded}
            style={{ paddingRight: "10px" }}
          />
          <DeleteOutlineIcon onClick={deleteTodo} />
        </div>
        <div>
          <TodoModal id={props.id} todo={props.todo} 
          closeModal={() => setUpdateNeeded(!updateNeeded)} />
        </div>
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            marginLeft: "450px",
            marginRight: "0px",
          }}
        >
          <ModeEditOutlineIcon
            onClick={setUpdateNeeded}
            style={{ paddingRight: "10px" }}
          />
          <DeleteOutlineIcon onClick={deleteTodo} />
        </div>
      )}
    </>
  );
};

export default TodoEdit;

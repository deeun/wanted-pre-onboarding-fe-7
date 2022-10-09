import { useState } from "react";
import Input from "@mui/material/Input";
import styles from './TodoModal.module.css'
import axios from "../../api/axios";

const TODO_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos";
const access_token = localStorage.getItem("token");

const TodoModal = (props) => {
  const [editedTodo, setEditedTodo] = useState();

  function handleTodoInputChange(e) {
    setEditedTodo(e.target.value);
    e.preventDefault();
  }
  const closeModal = () => {
    props.closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todos = { todo: editedTodo, isCompleted: false };
    axios
      .put(
        `${TODO_URL}/${props.id}`,
        JSON.stringify(todos),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          }
        },
      ).then(function (response) {
        setEditedTodo("")
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  };

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <p className={styles.p}>
          변경할 내용을 입력해주세요
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            type="text"
            name="editedTodo"
            color="warning"
            onChange={handleTodoInputChange}
          />
        </form>
        <div>
          <button id="editedTodoSaveBtn" className={styles.button}  style={{marginRight : "10px" }} type="submit" onClick={handleSubmit}>
            저장하기
          </button>
          <button id="modalCloseBtn" className={styles.button} onClick={closeModal}>
            닫기
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default TodoModal;

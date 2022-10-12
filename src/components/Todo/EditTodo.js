import Modal from "../UI/Modal";
import React, { useState } from "react";
import Button from "../UI/Button";
import styles from "./EditTodo.module.css";
import { Input } from "@mui/material";
import axios from "../../api/axios";

const EditTodo = (props) => {
  const [editedTodo, setEditedTodo] = useState(props.todo);

  const editTodoHandler = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const todos = { todo: editedTodo, isCompleted: false };
    axios
      .put(`/todos/${props.id}`, JSON.stringify(todos), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setEditedTodo("");
        props.updateHandler();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal>
      <div className={styles.wrapper}>
        <form>
          <Input
            id="standard-basic"
            variant="standard"
            type="text"
            color="warning"
            width="100%"
            value={editedTodo}
            onChange={editTodoHandler}
          />
          <div className={styles.buttons}>
            <Button style={{ marginRight: "10px" }} onClick={handleSubmit}>
              수정하기
            </Button>
            <Button onClick={props.close}>닫기</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTodo;

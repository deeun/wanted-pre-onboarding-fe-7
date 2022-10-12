import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./DeleteTodo.module.css";
import axios from "../../api/axios";

const DeleteTodo = (props) => {
  console.log(props.id)
  const handleSubmit = () => {
    const token = localStorage.getItem("access_token");
    axios
      .delete(`/todos/${props.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        props.updateHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal>
      <div className={styles.wrapper}>
        삭제하시겠습니까 ?
        <div className={styles.buttons}>
          <Button style={{ marginRight: "10px" }} onClick={handleSubmit}>
            삭제하기
          </Button>
          <Button onClick={props.close}>닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTodo;

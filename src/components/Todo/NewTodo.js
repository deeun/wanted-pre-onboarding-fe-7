import React, { useState } from "react";
import styles from "./NewTodo.module.css";
import Input from "@mui/material/Input";
import axios from "../../api/axios";

const NewTodo = (props) => {
  const [newTodo, setNewTodo] = useState("");

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todos = { todo: newTodo };
    axios
      .post("/todos", JSON.stringify(todos), {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setNewTodo("");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  };

  return (
    <>
      <form>
        <Input
          id="standard-basic"
          variant="standard"
          autoComplete="off"
          type="text"
          name="new-todo"
          color="warning"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleSubmit} className={styles.button}>
          추가하기
        </button>
      </form>
    </>
  );
};

export default NewTodo;

import React, { useState } from "react";
import styles from "./NewTodo.module.css";
import Input from "@mui/material/Input";
import axios from "../../api/axios";

const TODO_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos";
const access_token = localStorage.getItem("token");

const NewTodo = (props) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todos = { todo: newTodo };
    axios
      .post(
        TODO_URL,
        JSON.stringify(todos),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          }
        },
      )
      .then(function (response) {
        setNewTodo("")
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });

    // fetch(TODO_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //      Authorization: "Bearer " + access_token,
    //   },
    //   body: JSON.stringify(todo),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setNewTodo("")
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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

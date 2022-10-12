import React, { useState } from "react";
import styles from "./NewTodo.module.css";
import Input from "@mui/material/Input";
import axios from "../../api/axios";
import Button from "../UI/Button";

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
        props.updateHandler();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form className={styles.form}>
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
        <br/>
        <Button onClick={handleSubmit} style={{width : "100%", marginTop : 0}}>
          추가하기
        </Button>
      </form>
    </div>
  );
};

export default NewTodo;

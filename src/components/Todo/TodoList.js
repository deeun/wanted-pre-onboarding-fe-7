import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import axios from "../../api/axios";
import TodoEdit from "./TodoEdit";
import { Checkbox } from "@mui/material";

const TODO_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos";

const TodoList = (props) => {
  const [todo, setTodo] = useState([]);
  const [checked, setChecked] = useState(false);
 
  const access_token = localStorage.getItem("token");

  const setTodoHandler = (data) => setTodo(data);

  useEffect(() => {
    axios
      .get(TODO_URL, {
        headers: { Authorization: "Bearer " + access_token },
      })
      .then(function (response) {
        const data = response.data;
        setTodoHandler(data);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [todo, access_token, setTodoHandler]);

  const checkbox = document.getElementById("checkbox");
  if (checkbox === true) {
    setChecked(true);
    console.log(checked)
  }

  return (
    <ul className={styles.list}>
      <div className={styles.todolist}>
        {todo.map((item) => {
          return (
            <li className={checked ? styles.checked : styles.notchecked}
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Checkbox
                type="checkbox"
                id="checkbox"
                value="checkbox"
                color="default"
                // onChange={handleChange}
              />
              {item.todo}
              <TodoEdit key={item.id} id={item.id} todo={item.todo} />
            </li>
          );
        })}
      </div>
    </ul>
  );
};

export default TodoList;

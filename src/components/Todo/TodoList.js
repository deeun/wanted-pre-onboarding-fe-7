import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import axios from "../../api/axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "@mui/material";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const TodoList = (props) => {
  const [todo, setTodo] = useState([]);
  const [checked, setChecked] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);

  const [todoId, setTodoId] = useState("");
  const [oneTodo, setOneTodo] = useState("");

  const editHandler = () => {
    setEditTodo(true);
  };
  const editCloseHandler = () => {
    setEditTodo(false);
  };

  const deleteHandler = () => {
    setDeleteTodo(true);
  };
  const deleteCloseHandler = () => {
    setDeleteTodo(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("/todos", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        const data = response.data;
        setTodo(data);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [props.isUpdated]);

  // const checkbox = document.getElementById("checkbox");
  // if (checkbox === true) {
  //   setChecked(true);
  //   console.log(checked);
  // }

  return (
    <ul className={styles.list}>
      <div className={styles.todolist}>
        {todo.map((item) => {
          return (
            <li
              className={checked ? styles.checked : styles.notchecked}
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span>
                <Checkbox
                  type="checkbox"
                  id="checkbox"
                  value="checkbox"
                  color="default"
                />
                {item.todo}
              </span>
              <span className={styles.icons}>
                <FaPencilAlt
                  onClick={() => {
                    editHandler();
                    setTodoId(item.id);
                    setOneTodo(item.todo);
                  }}
                />
                <FaTrashAlt
                  onClick={() => {
                    deleteHandler();
                    setTodoId(item.id);
                  }}
                />
              </span>
            </li>
          );
        })}
        {editTodo ? (
          <EditTodo
            id={todoId}
            todo={oneTodo}
            updateHandler={props.updateHandler}
            close={editCloseHandler}
          />
        ) : (
          ""
        )}
        {deleteTodo ? (
          <DeleteTodo
            id={todoId}
            updateHandler={props.updateHandler}
            close={deleteCloseHandler}
          />
        ) : (
          ""
        )}
      </div>
    </ul>
  );
};

export default TodoList;

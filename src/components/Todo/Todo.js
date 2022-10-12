import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import styles from "./Todo.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import Login from "../Auth/LogIn";

const Todo = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const logout = () => {
    ctx.onLogout();
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.todo}>
          <h2>잊으면 안돼요 !!</h2>
          <button className={styles.button} onClick={logout}>
            로그아웃
          </button>
        </div>
        <NewTodo updateHandler={updateHandler} />
        <TodoList isUpdated={isUpdated} updateHandler={updateHandler} />
      </section>
    </div>
  );
};

export default Todo;

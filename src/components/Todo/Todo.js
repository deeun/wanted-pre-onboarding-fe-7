import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import styles from "./Todo.module.css";

const Todo = () => {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <section>
        <div className={styles.todo}>
          <h2>잊으면 안돼요 !!</h2>
          <button className={styles.button} onClick={logout}>
            로그아웃
          </button>
        </div>
        <NewTodo />
        <TodoList />
      </section>
    </>
  );
};

export default Todo;

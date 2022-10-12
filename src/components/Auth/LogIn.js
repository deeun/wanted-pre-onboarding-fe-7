import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import styles from "./Login.module.css";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/signin",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const token = response?.data?.access_token;
        localStorage.setItem("access_token", token);
        localStorage.setItem("isLoggedIn", 1);
        ctx.onLogin();
        alert("🧚‍♀️로그인 성공🧚‍♀️");
        navigate("/todo");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("서버 응답이 없습니다");
      } else {
        setErrMsg("이메일 혹은 비밀번호를 확인해주세요");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
        <h1>로그인</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">이메일:</label>
          <Input
            color="warning"
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <br/>
          <label htmlFor="password">비밀번호:</label>
          <Input
            color="warning"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Button>로그인</Button>
        </form>
        <p>
          회원이 아니신가요?
          <br />
          <span>
            <a href="/">회원가입 하러가기</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

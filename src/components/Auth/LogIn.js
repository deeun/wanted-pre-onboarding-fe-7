import { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./Login.module.css";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const navigate = useNavigate();

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
        alert("🧚‍♀️로그인 성공🧚‍♀️")
        navigate("/todo")
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg("서버 응답이 없습니다");
      } else {
        setErrMsg("로그인 실패");
      }
    }
  };

  return (
    <>
      <section>
        <div className={styles.login}>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <h1>로그인</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일:</label>
            <Input
              color="warning"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">비밀번호:</label>
            <Input
              color="warning"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className={styles.button}>로그인</button>
          </form>
          <p>
            회원이 아니신가요?
            <br />
            <span className="line">
              <a href="/">회원가입 하러가기</a>
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;

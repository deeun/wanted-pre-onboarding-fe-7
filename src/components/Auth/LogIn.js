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
        alert("๐งโโ๏ธ๋ก๊ทธ์ธ ์ฑ๊ณต๐งโโ๏ธ");
        navigate("/todo");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("์๋ฒ ์๋ต์ด ์์ต๋๋ค");
      } else {
        setErrMsg("์ด๋ฉ์ผ ํน์ ๋น๋ฐ๋ฒํธ๋ฅผ ํ์ธํด์ฃผ์ธ์");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
        <h1>๋ก๊ทธ์ธ</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">์ด๋ฉ์ผ:</label>
          <Input
            color="warning"
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <br/>
          <label htmlFor="password">๋น๋ฐ๋ฒํธ:</label>
          <Input
            color="warning"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Button>๋ก๊ทธ์ธ</Button>
        </form>
        <p>
          ํ์์ด ์๋์?๊ฐ์?
          <br />
          <span>
            <a href="/">ํ์๊ฐ์ ํ๋ฌ๊ฐ๊ธฐ</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

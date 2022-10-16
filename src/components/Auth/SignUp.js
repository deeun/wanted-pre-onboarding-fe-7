import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import LogIn from "./LogIn.js";
import Input from "@mui/material/Input";
import styles from "./SignUp.module.css";
import Button from "../UI/Button";

const EMAIL_REGEX = /^[A-z0-9-_]+@[A-z0-9-_.].{1,23}$/;
const PASSWORD_REGEX = /^.{8,}$/;

const SignUp = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/signup",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        alert("🧚회원가입 성공🧚‍♀️");
        setSuccess(true);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("인터넷 연결이 끊겼습니다");
      } else {
        setErrMsg("이미 존재하는 계정 입니다");
      }
    }
  };

  return (
    <>
      {success ? (
        <LogIn />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.signup}>
            <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <h1>회원가입</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email">이메일 :</label>
              <Input
                color="warning"
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                className={
                  emailFocus && email && !validEmail
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                이메일 주소를 입력해주세요
                <br />
                (예. yourid@gmail.com)
              </p>
              <br/>
              <label htmlFor="password">비밀번호 :</label>
              <Input
                color="warning"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? styles.instructions : styles.offscreen
                }
              >
                비밀번호는 8자 이상이어야 합니다.
                <br />
                사용가능한 특수문자: !, @, #, $, %
              </p>
              <Button
                type="submit"
                className={styles.button}
                disabled={!validEmail || !validPassword ? true : false}
              >
                회원가입
              </Button>
            </form>
            <p>
              이미 회원이신가요 ?
              <br />
              <span>
                <a href="/login">로그인 하러가기</a>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

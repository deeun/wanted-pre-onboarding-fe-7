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
        alert("π§νμκ°μ μ±κ³΅π§ββοΈ");
        setSuccess(true);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("μΈν°λ· μ°κ²°μ΄ λκ²Όμ΅λλ€");
      } else {
        setErrMsg("μ΄λ―Έ μ‘΄μ¬νλ κ³μ  μλλ€");
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
            <h1>νμκ°μ</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email">μ΄λ©μΌ :</label>
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
                μ΄λ©μΌ μ£Όμλ₯Ό μλ ₯ν΄μ£ΌμΈμ
                <br />
                (μ. yourid@gmail.com)
              </p>
              <br/>
              <label htmlFor="password">λΉλ°λ²νΈ :</label>
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
                λΉλ°λ²νΈλ 8μ μ΄μμ΄μ΄μΌ ν©λλ€.
                <br />
                μ¬μ©κ°λ₯ν νΉμλ¬Έμ: !, @, #, $, %
              </p>
              <Button
                type="submit"
                className={styles.button}
                disabled={!validEmail || !validPassword ? true : false}
              >
                νμκ°μ
              </Button>
            </form>
            <p>
              μ΄λ―Έ νμμ΄μ κ°μ ?
              <br />
              <span>
                <a href="/login">λ‘κ·ΈμΈ νλ¬κ°κΈ°</a>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

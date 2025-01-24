"use client";
import React, { useState } from "react";
import styles from "../../styles.module.scss";
import Link from "next/link";
import SignWith from "../../../../components/SignInSocial";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import { authApi, useLoginQuery } from "@/service/auth.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import auth, { setAuth } from "@/store/slices/auth";
import { redirect } from "next/navigation";
import { usrApi } from "@/service/userApi.service";
import { useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";

export default React.memo(function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState(""); // имя пользователя
  const [password, setPassword] = useState(""); // пароль
  const [error, setError] = useState<string | null>(null); // состояние для ошибки
  const [showPassword, setShowPassword] = useState(false); // состояние видимости пароля
  const router = useRouter();

  const [trigger, result, lastPromiseInfo] =
    authApi.endpoints.login.useLazyQuery() as [any, any, any];
  const [userTrigger, userResult] = usrApi.endpoints.getMe.useLazyQuery();

  const handleClick = async () => {
    const token = btoa(username + ":" + password);
    dispatch(setAuth({ user: username, token }));

    try {
      const loginResponse = await trigger({ username, password });
      if (loginResponse.isSuccess) {
        const userResponse = await userTrigger();
        if (userResponse.isSuccess) {
          dispatch(
            setAuth({
              user: userResponse.data ? userResponse.data : null,
              token,
            })
          );
          router.push("/");
        } else {
          setError(
            "Не удалось получить данные пользователя. Повторите попытку."
          );
        }
      } else {
        setError("Неверный номер телефона или пароль.");
        dispatch(setAuth({ user: null, token: "" }));
      }
    } catch (err) {
      setError("Произошла ошибка. Повторите попытку.");
      console.error(err);
    }
  };

  return (
    <Form type="sign-in" action={handleClick}>
      <FormHeading for="phone">ВХОД</FormHeading>
      {error && <div className={styles.error}>{error}</div>}{" "}
      {/* Блок для отображения ошибки */}
      <div className={styles.phone_field}>
        <TextInput
          name="phone"
          type="tel"
          id="phone"
          placeholder="Номер"
          value={username}
          onChange={(v) => setUsername(v)}
        />
      </div>
      <div className={styles.passwordWrapper}>
        <TextInput
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Пароль"
          value={password}
          onChange={(v) => setPassword(v)}
        />
        <button
          type="button"
          className={styles.showPasswordButton}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Скрыть" : "Показать"}
        </button>
      </div>
      <div className={styles.captcha}></div>
      <Button type="submit" onClick={handleClick}>
        Продолжить
      </Button>
      {/* <SignWith /> */}
      <div className={`${styles.haveAccount} ${styles.mar1}`}>
        <Link className={styles.link} href={"/sign-up"}>
          Зарегистрироваться!
        </Link>
      </div>
      <Link
        className={`${styles.link} ${styles.noUnderLine}`}
        href={"/sign-in/phone-confirmation"}
      >
        Забыли пароль?
      </Link>
    </Form>
  );
});

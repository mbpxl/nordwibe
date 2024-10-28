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

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState(""); // имя пользователя
  const [password, setPassword] = useState(""); // пароль
  const router = useRouter(); // получаем роутер

  /**
   * trigger - функция которая запускает запрос, определённый в 
   * authApi.endpoints.login. Её можно вызвать с любыми нужными параметрами, 
   * когда это требуется, например, при нажатии кнопки
   */

  const [trigger, result, lastPromiseInfo] =
    authApi.endpoints.login.useLazyQuery();
  const [userTrigger, userResult] = usrApi.endpoints.getMe.useLazyQuery();

  const handleClick = async () => {
    const token = btoa(username + ":" + password); // кодируем токен
    console.log(token);
    dispatch(setAuth({ user: username, token })); // Отправляем в state (authSlice) данные
    const loginResponse = await trigger(); // Запускаем запрос, вызываем функцию login()
    console.log(loginResponse); // output

    if (loginResponse.isSuccess) { // если всё ок, то:
      const userResponse = await userTrigger(); // отправляем запрос на getMe() _ получаем пользователя
      if (userResponse.isSuccess) { // если всё ок, то:
        dispatch(
          setAuth({
            user: userResponse.data ? userResponse.data : null,
            token,
          }) // отправляем в state (authSlice) данные
        );
        router.push("/"); // перенаправляем в главную страницу
      }
    } else {
      dispatch(setAuth({ user: null, token: "" })); // если всё пошло по пизде, то обнуляем данные
    }
  };

  return (
    <Form type="sign-in" action={handleClick}>
      <FormHeading for="phone">ВХОД</FormHeading>

      <TextInput
        name="phone"
        type="tel"
        id="phone"
        placeholder="Номер"
        value={username}
        onChange={(v) => setUsername(v)}
      />

      <TextInput
        name="password"
        type="password"
        id="password"
        placeholder="Пароль"
        value={password}
        onChange={(v) => setPassword(v)}
      />

      <div className={styles.captcha}></div>

      <Button type="submit" onClick={handleClick}>
        Продолжить
      </Button>

      <SignWith />

      <div className={`${styles.haveAccount} ${styles.mar1}`}>
        <div>Нет аккаунта?</div>

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
}


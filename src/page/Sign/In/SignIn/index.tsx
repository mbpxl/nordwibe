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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [trigger, result, lastPromiseInfo] =
    authApi.endpoints.login.useLazyQuery();
  const [userTrigger, userResult] = usrApi.endpoints.getMe.useLazyQuery();
  const handleClick = async () => {
    const token = btoa(username + ":" + password);
    dispatch(setAuth({ user: null, token }));
    const loginResponse = await trigger();
    console.log(loginResponse);
    if (loginResponse.isSuccess) {
      const userResponse = await userTrigger();
      if (userResponse.isSuccess) {
        dispatch(
          setAuth({
            user: userResponse.data ? userResponse.data : null,
            token,
          })
        );
        // console.log(loginResponse)
        // console.log(userResponse)
        router.push("/");
      }
    } else {
      dispatch(setAuth({ user: null, token: "" }));
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


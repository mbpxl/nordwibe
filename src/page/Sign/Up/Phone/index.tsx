"use client";
import React, { FormHTMLAttributes, useState } from "react";
import styles from "../../styles.module.scss";
import Link from "next/link";
import SignWith from "../../../../components/SignInSocial";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import { SmartCaptcha } from "@yandex/smart-captcha";

import FormMessage from "@/components/Form/Message";
import { notFound, redirect } from "next/navigation";
import { ICreateUser } from "@/interfaces/user.interface";
import {
  useCaptchaMutation,
  useRegistrationMutation,
} from "@/service/auth.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setAuth } from "@/store/slices/auth";
import { setEmptyUser, setUser, userSlice } from "@/store/slices/user";
import { useTypedSelector } from "@/hooks/selector.hook";
import { version } from "os";
import { YANDEX_API_KEY } from "@/secret";

type RegisterStatus =
  | "phone"
  | "phone_confirmation"
  | "required data"
  | "other";

export default React.memo(function PhoneInput() {
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const [token, setToken] = useState("");
  const [userSecret, setUserSecret] = useState("");
  const [isSecondStep, setIsSecondStep] = useState(false); //false
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [stage, setStage] = useState<RegisterStatus>("phone");
  // console.log("kek")
  // console.log(process.env.REACT_APP_YANDEX_API_KEY)
  //form data
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  //hook calls
  const dispatch = useDispatch<AppDispatch>();
  const [registration, { error }] = useRegistrationMutation();
  const [captcha, { error: captchaErr }] = useCaptchaMutation();

  const onSubmit = async () => {
    switch (stage) {
      case "phone":
        if (token == "") {
          setShowErrorMessage(true);
          return;
        }
        setShowErrorMessage(false);
        const captchaResponse = await captcha({
          username: username.replace(/[^0-9,\+]/g, ""),
          captcha_token: token,
        }).unwrap();
        console.log(captchaResponse);
        if (captchaErr) {
          console.log(captchaErr);
          return;
        }
        setUserSecret(captchaResponse.userSecret);
        setStage("phone_confirmation");
        break;
      case "phone_confirmation":
        setStage("required data");
        break;
      case "required data":
        const createUserDTO: ICreateUser = {
          telephone_code: phoneCode,
          first_name: name,
          username: username.replace(/[^0-9,\+]/g, ""), //+7 (XXX) XXX-XX-XX -> +7XXXXXXXXXX
          email,
          password: pass,
          captcha_token: token,
          user_secret: userSecret,
        };
        console.log(createUserDTO);
        //отправляем запрос на бэк
        const user = await registration(createUserDTO).unwrap();
        console.log(user);
        dispatch(setAuth({ user, token: "" }));

        if (error) console.log(error);

        break;

      case "other":
        break;
      default:
        console.log("that doesnt seem to happen bruh");
    }

    //мб поменять логику редиректа?
    // redirect("/sign-in");
  };
  return (
    <Form action={onSubmit}>
      {stage == "phone" && (
        <>
          <TextInput
            name="phone"
            type="tel"
            id="phone"
            placeholder="Номер"
            value={username}
            onChange={(v) => {
              setUsername(v);
            }}
          />
          <SignWith />
          <div className={`${styles.haveAccount} ${styles.mar1}`}>
            <div>Есть аккаунт?</div>
            <Link className={styles.link} href={"/sign-in"}>
              Войти!
            </Link>
          </div>
          {showErrorMessage && <p>ВВЕДИТЕ КАПЧУ</p>}
          <div className={styles.captcha}>
            <SmartCaptcha
              sitekey={process.env.REACT_APP_YANDEX_API_KEY || YANDEX_API_KEY}
              onSuccess={(t) => {
                setToken(t);
                console.log(t);
              }}
            ></SmartCaptcha>
          </div>
        </>
      )}

      {stage == "phone_confirmation" && (
        <>
          <FormMessage>
            Вам поступит звонок, введите последние 4 цифры
          </FormMessage>

          <TextInput
            name="phone-confirm"
            type="text"
            id="phone-confirm"
            placeholder="1234"
            value={phoneCode}
            onChange={(v) => setPhoneCode(v)}
          />
        </>
      )}

      {stage == "required data" && (
        <div>
          <TextInput
            name="name"
            type="text"
            id="name"
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(v) => {
              setName(v);
            }}
          />
          <TextInput
            name="email"
            type="text"
            id="email"
            placeholder="Твоя почта"
            value={email}
            onChange={(v) => {
              setEmail(v);
            }}
          />
          <TextInput
            name="pass"
            type="password"
            id="pass"
            placeholder="Пароль"
            value={pass}
            onChange={(v) => {
              setPass(v);
            }}
          />
          <TextInput
            name="confirmPass"
            type="password"
            id="confirmPass"
            placeholder="Повтори пароль"
            value={confirmPass}
            onChange={(v) => {
              setConfirmPass(v);
            }}
          />
        </div>
      )}
      {stage == "other" && <>{/* some other data, idk */}</>}

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});

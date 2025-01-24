"use client";
import React, { useState } from "react";
import styles from "../../styles.module.scss";
import Link from "next/link";
import SignWith from "../../../../components/SignInSocial";
import Form from "@/components/Form";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import { SmartCaptcha } from "@yandex/smart-captcha";

import FormMessage from "@/components/Form/Message";
import { useRouter } from "next/navigation";
import { ICreateUser } from "@/interfaces/user.interface";
import {
  useCaptchaMutation,
  useRegistrationMutation,
} from "@/service/auth.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setAuth } from "@/store/slices/auth";
import { YANDEX_API_KEY } from "@/secret";

type RegisterStatus =
  | "phone"
  | "phone_confirmation"
  | "required data"
  | "other";

export default React.memo(function PhoneInput() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [userSecret, setUserSecret] = useState<any>("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [stage, setStage] = useState<RegisterStatus>("phone");

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
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // состояние видимости пароля

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePhoneConfirmation = (code: string) => {
    return code.length === 4 && /^\d+$/.test(code);
  };

  const validateUserData = (name: string, email: string, pass: string) => {
    const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      nameRegex.test(name) &&
      emailRegex.test(email) &&
      pass.length >= 6 &&
      pass === confirmPass
    );
  };

  const onSubmit = async () => {
    switch (stage) {
      case "phone":
        console.log(username);
        if (!validatePhone(username)) {
          setErrorMessage("Некорректный номер телефона!");
          return;
        }
        setErrorMessage("");
        const captchaResponse = await captcha({
          username: username.replace(/[^0-9,\+]/g, ""),
          captcha_token: token,
        }).unwrap();
        alert(captchaResponse);
        if (captchaErr) {
          console.log(captchaErr);
          return;
        }
        setUserSecret(captchaResponse.user_secret);
        setStage("phone_confirmation");
        break;
      case "phone_confirmation":
        if (!validatePhoneConfirmation(phoneCode)) {
          setErrorMessage("Неправильные данные!");
          return;
        }
        setErrorMessage("");
        setStage("required data");
        break;
      case "required data":
        if (!validateUserData(name, email, pass)) {
          setErrorMessage("Введите корректные данные!");
          return;
        }
        setErrorMessage("");
        try {
          const createUserDTO: ICreateUser = {
            telephone_code: phoneCode,
            first_name: name,
            username: username.replace(/[^0-9,\+]/g, ""),
            email,
            password: pass,
            captcha_token: token,
            user_secret: userSecret,
          };
          const user = await registration(createUserDTO).unwrap();
          dispatch(setAuth({ user, token: "" }));
          router.push("/survey");
        } catch (error) {
          setErrorMessage("Ошибка при регистрации!");
          console.error(error);
        }
        break;

      default:
        console.log("Неизвестный этап регистрации");
    }
  };
  return (
    <Form action={onSubmit}>
      {stage == "phone" && (
        <>
          <FormMessage>
            Давай начнем! Укажи свой номер для подтверждения аккаунта
          </FormMessage>
          <TextInput
            name="phone"
            type="tel"
            id="phone"
            placeholder="+7 912 345 67 89"
            value={username}
            onChange={(v) => {
              setUsername(v);
            }}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {/* <SignWith /> */}
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
            Тебе поступит звонок-сброс. Введи последние 4 цифры номера
          </FormMessage>

          <TextInput
            name="phone-confirm"
            type="text"
            id="phone-confirm"
            placeholder="1234"
            value={phoneCode}
            onChange={(v) => setPhoneCode(v)}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </>
      )}

      {stage == "required data" && (
        <div>
          <FormMessage>Почти закончили!</FormMessage>
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
          <div className={styles.passwordWrapper}>
            <TextInput
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Пароль"
              value={pass}
              onChange={(v) => setPass(v)}
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
          <div className={styles.passwordWrapper}>
            <TextInput
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Пароль"
              value={confirmPass}
              onChange={(v) => setConfirmPass(v)}
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      )}
      {stage == "other" && <>{/* some other data, idk */}</>}

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});

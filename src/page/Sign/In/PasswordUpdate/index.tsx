import React from "react";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";

export default React.memo(function PasswordUpdate() {
  return (
    <Form>
      <FormHeading for="password">НОВЫЙ ПАРОЛЬ</FormHeading>
      <TextInput
        name="password"
        type="password"
        id="password"
        placeholder="Новый пароль"
      />
      <TextInput
        name="repeat-password"
        type="password"
        id="repeat-password"
        placeholder="Повторите пароль"
      />

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});

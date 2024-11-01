import React from "react";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import FormMessage from "@/components/Form/Message";

export default React.memo(function PhoneConfirmation() {
  return (
    <Form>
      <FormHeading for="phone-confirm">ПОДТВЕРДИТЕ НОМЕР</FormHeading>

      <FormMessage>Вам поступит звонок, введите последние 4 цифры</FormMessage>

      <TextInput
        name="phone-confirm"
        type="text"
        id="phone-confirm"
        placeholder="1234"
      />

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});

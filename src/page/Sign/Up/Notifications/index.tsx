import React from "react";
import styles from "../../styles.module.scss";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import FormMessage from "@/components/Form/Message";
import Button from "@/components/Button";

export default React.memo(function EnableNotifications() {
  return (
    <Form>
      <FormHeading>УВЕДОМЛЕНИЯ</FormHeading>
      <FormMessage>
        Чтобы вы знали, когда вам напишут или опубликуют пост от пользователей,
        пожалуйста, разрешите уведомления
      </FormMessage>
      <Button type="submit">Разрешить</Button>
    </Form>
  );
});

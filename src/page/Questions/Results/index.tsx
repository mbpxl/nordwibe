"use client";

import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { QuestionsContext } from "../Provider";
import {
  IHouseGeneral,
  toBuildingType,
  toRepairType,
  toSoundIsolationType,
} from "@/interfaces/house.interface";
import {
  hApi,
  useCreateHouseMutation,
  useEditHouseMutation,
  useUploadImagesMutation,
} from "@/service/houseApi.service";
import Link from "next/link";

function convertToString(value: string | string[] | null): string {
  if (value === null) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.join(",");
  }

  return String(value);
}

function toBoolArray(value: string | string[] | null): boolean[] {
  if (value === null) {
    return [false];
  }

  if (Array.isArray(value)) {
    return [false];
  }
  const jsonData = JSON.parse(value);
  const array = Array.isArray(jsonData) ? jsonData : [jsonData];
  return array.map((item) => item.key);
}

export default React.memo(function Results() {
  const [house, { error }] = useCreateHouseMutation();
  const [img, { error: imgError }] = useUploadImagesMutation();
  const [editHouse, { error: editHouseError }] = useEditHouseMutation();
  const [trigger, result, lastPromiseInfo] =
    hApi.endpoints.getHouse.useLazyQuery();
  const handleClick = async () => {
    if (p) {
      const response = await house(p);
      let formData = new FormData();
      files.forEach((f) => {
        formData.append("files", f, f.name);
      });
      const imgResponse = await img(formData);
      if (response.data) {
        const getHouseResponse = await trigger(response.data.id);
        if (getHouseResponse.isSuccess && !imgResponse.error) {
          p.photos_ids = imgResponse.data;
          const editHouseResponse = await editHouse({
            id: response.data.id,
            house: p,
          });
        }
      }
    }
  };

  const { answers = [], files = [] } = useContext(QuestionsContext);
  console.log(answers);
  // console.log(files);

  if (!answers || answers.length === 0) {
    return (
      <div>
        <h2>В начале необходимо заполнить анкету!</h2>
        <Link href={"/add-apartment"}>Заполнить анкету!</Link>
      </div>
    );
  }

  const p: IHouseGeneral = {
    address: convertToString(answers[0].content),
    type: "UK",
    type_extra: "",
    i_am_owner: answers[1].content == "Я собственник",
    count_days_from: JSON.parse(convertToString(answers[2].content)).map(
      Number
    )[0],
    count_days_to: JSON.parse(convertToString(answers[2].content)).map(
      Number
    )[1], //говнокод?)
    cost: JSON.parse(convertToString(answers[3].content)).map(Number)[0],
    is_have_bail: answers[4].content == "Да",
    is_have_fines: answers[5].content == "Да",
    cost_utilities: JSON.parse(convertToString(answers[3].content)).map(
      Number
    )[1], //hmmmm
    count_neighbors: 0, //mb 7
    count_rooms: Number(answers[6].content),
    floor: JSON.parse(convertToString(answers[8].content)).map(Number)[0],
    building_floor: JSON.parse(convertToString(answers[8].content)).map(
      Number
    )[1], //ghmmmm
    repair_type: toRepairType(answers[9].content),
    repair_type_extra: "",
    building_type: toBuildingType(answers[10].content),
    building_type_extra: "",
    sound_insulation_type: toSoundIsolationType(answers[11].content),
    sound_insulation_type_extra: "",
    accessibility_type: "UK", //12
    accessibility_type_extra: "",
    is_sunny_side: toBoolArray(answers[12].content)[1], //12
    is_possible_smoke: toBoolArray(answers[12].content)[2], //12
    is_possible_animals: toBoolArray(answers[12].content)[3], //12

    is_have_elevator: toBoolArray(answers[13].content)[0], //13
    is_have_balcony: toBoolArray(answers[13].content)[1], //13
    is_have_parking_space: toBoolArray(answers[13].content)[2], //13
    is_have_security: toBoolArray(answers[13].content)[3], //13
    is_have_horizontal_bars: toBoolArray(answers[13].content)[4], //13
    is_have_conditioner: toBoolArray(answers[13].content)[5], //13
    is_have_garbage_chute: toBoolArray(answers[13].content)[6], //13
    is_have_wifi: toBoolArray(answers[13].content)[7], //13
    is_have_transport_close: toBoolArray(answers[13].content)[8], //13

    is_have_washing_machine: toBoolArray(answers[14].content)[0], //14
    is_have_dryer: toBoolArray(answers[14].content)[1], //14
    is_have_dishwasher: toBoolArray(answers[14].content)[2], //14
    is_have_hair_dryer: toBoolArray(answers[14].content)[3], //14
    is_have_tv: toBoolArray(answers[14].content)[4], //14
    is_have_guest_cabinet: toBoolArray(answers[14].content)[5], //14
    is_have_guest_table: toBoolArray(answers[14].content)[6], //14

    is_have_iron: true, //в форме нет поля для утюга
    photos_ids: [],
    description: "",
  };
  console.log(p);
  return (
    <>
      <h1 className={styles.heading}>Results</h1>
      <div>
        {answers.map((answer) => (
          <div style={{ display: "flex", gap: "1rem" }} key={answer.id}>
            <div>{answer.id}</div>
            <div>{answer.content}</div>
          </div>
        ))}
        <button onClick={handleClick}>Отправить!</button>
      </div>
    </>
  );
});

"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { ChangeEvent, useRef, useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import { YMaps, Map, GeoObject } from "@pbe/react-yandex-maps";
import styles from "../TextAndMap/styles.module.scss";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  answerVal?: any;
};

export default React.memo(function TextAndMap(props: QuestionProps) {
  const [answer, setAnswer] = useState<string>("");
  const [addressCoord, setAddressCoord] = useState([55.75, 37.57]);
  const mapRef = useRef();
  const [ymap, setYmap] = useState();

  const onClickToMap = async (e: any, ymaps?: any) => {
    const coords = e.get("coords");
    setAddressCoord(coords);

    ymaps.geocode(coords).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAnswer(firstGeoObject.getAddressLine());
    });
  };
  const inputOnChange = async (
    value: React.FormEvent<HTMLInputElement>,
    ymaps?: any
  ) => {
    setAnswer(value.currentTarget.value);
    ymaps.geocode(value.currentTarget.value).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAddressCoord(firstGeoObject.geometry._coordinates);
    });
  };

  const geocode = (ymaps: any) => {
    setYmap(ymaps);
  };

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>, ymaps?: any) {
    if (addressCoord && answer.trim()) {
      props.onAnswer(JSON.stringify(addressCoord));
    }
  }

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>
      <input
        className={styles.input}
        type="text"
        id={props.question.id.toString()}
        placeholder="Ваш ответ"
        value={answer}
        onChange={(value) => inputOnChange(value, ymap)}
      />
      <div className={styles.map}>
        <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
          <Map
            style={{ width: "98%", height: "90%" }}
            instanceRef={mapRef}
            onLoad={(ymaps) => geocode(ymaps)}
            onClick={(e: any) => onClickToMap(e, ymap)}
            state={{
              center: addressCoord,
              zoom: 9,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={[
              "control.ZoomControl",
              "control.FullscreenControl",
              "multiRouter.MultiRoute",
              "geocode",
            ]}
          >
            <GeoObject
              geometry={{
                type: "Point",
                coordinates: addressCoord,
              }}
            />
          </Map>
        </YMaps>
      </div>
      <Button>Продолжить</Button>
    </Form>
  );
});

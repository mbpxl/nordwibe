import QuestionsLayout from "@/page/Questions/Layout";
import { QuestionType } from "@/page/Questions/Provider";
import React from "react";

export default ({ children }: { children: React.ReactNode }) => {
  const question: QuestionType[] = [
    {
      id: 1,
      content: "Укажи адрес, с точностью до дома",
      type: "textAndMap",
      answer: ""
    },
    {
      id: 2,
      content: "Твоя квартира?",
      anotherText: {
        first: "Я собственник",
        second: "Cам арендую",
      },
      answer: false,
      type: "switch",
    },

    {
      id: 3,
      content: "На какой срок рассчитываю сдать",
      type: "days",
      answer: 0
    },
    {
      id: 4,
      content: "Стоимость аренды и комунналки",
      type: "twoNumber",
      answer: [0, 0]
    },
    {
      id: 5,
      content: "Есть ли залог?",
      type: "yesNo",
      answer: false
    },
    {
      id: 6,
      content: "Предусмотрен ли штрафной лист?",
      type: "yesNo",
      answer: false
    },
    {
      id: 7,
      content: "Количество комнат",
      type: "number",
      answer: 0
    },
    {
      id: 8,
      content: "Отдельная комната или илизолированная?",
      anotherText: {
        first: "Изолированная",
        second: "Общая",
      },
      answer: "",
      type: "switch",
    },
    {
      id: 9,
      content: "Сколько всего этажей в здании из какой этаж у тебя",
      answer: [0, 0],
      type: "twoNumber",
      placeholder: {
        floor: "Этаж",
        all: "Всего этажей",
      },
    },
    {
      id: 10,
      content: "Вид ремонта",
      type: "yesNoUnsure",
      Radiovalues: {
        first: "Бабушкин",
        second: "Современный",
        third: "Дизайнерский",
      },
      answer: ""
    },
    {
      id: 11,
      content: "Что за дом",
      type: "miltiOption",
      Optionsvalues: [
        "Новостройка-жк",
        "Советский фонд",
        "Сталинки",
        "Старый фонд",
        "Частный дом",
      ],
      answer: ""
    },
    {
      id: 12,
      content: "Шумоизоляция",
      type: "yesNoUnsure",
      Radiovalues: {
        first: "Идеальная",
        second: "Приемлемо",
        third: "Картон",
      },
      answer: ""
    },
    {
      id: 13,
      content: "Особые параметры",
      type: "toggles",
      labels: [
        "Доступность дома для инвалидов",
        "Солнечная сторона (да/нет)",
        "Можно ли курить",
        "Можно ли с животными",
      ],
      answer: [
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
      ]
    },
    {
      id: 14,
      content: "Дополнительные удобства",
      type: "checklist",
      Optionsvalues: [
        "Лифт",
        "Балкон",
        "Парковочное место",
        "Охрана или консьерж",
        "Турники во дворе",
        "Кондей",
        "Мусоропровод",
        "Вайфай",
        "Транспорт в пешей доступности",
      ],
      answer: [
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
      ]

    },
    {
      id: 15,
      content: "Наличие бытовой техники",
      type: "checklist",
      Optionsvalues: [
        "Стиралка",
        "Сушилка/полотенцесушитель",
        "Посудомойка",
        "Фен",
        "Телек",
        "Отдельный шкаф",
        "Отдельный стол",
      ],
      answer: [
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
        { key: false, },
      ]
    },
    {
      id: 16,
      content: "Добавь 5-10 разных фото квартиры",
      type: "multiFile",
      answer: [""]
    },
    // {
    //   id: 16,
    //   content: "Добавь описание",
    //   type: "description",
    //   answer: ""
    // },
  ];
  return <QuestionsLayout questions={question}>{children}</QuestionsLayout>;
};

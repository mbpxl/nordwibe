// pages/flats/[id].tsx
"use client";
import React from "react";
import { useGetFlatByIdQuery } from "@/service/flats.service";
import { useRouter } from "next/router";
import { Metadata } from "next";
import FlatDetail from "@/page/FlatDetail";

const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: flat } = useGetFlatByIdQuery(id, {
    skip: typeof window === "undefined",
  });
  return {
    title: `${flat ? flat.name : "Loading..."} | Flats`,
    description: `Информация о квартире ${flat ? flat.name : "Loading..."}`,
  };
};

const FlatDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: flat, isLoading, error } = useGetFlatByIdQuery(params.id);

  if (isLoading) return <p>Загрузка...</p>;
  if (error || !flat) return <p>Квартира не найдена</p>;

  return <FlatDetail id={params.id} />;
};

export default React.memo(FlatDetailPage);

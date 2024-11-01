import { users } from "@/config";
import Occupation from "../../../../page/Profile/Occupation";
import { Metadata } from "next/types";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id;
  const user = users[Number(id)];

  return {
    title: `Занятия | Nordwibe`,
    description: `Страница занятий ${user ? user.username : undefined}`,
  };
};

const OccupationPage = () => {
  return <Occupation />;
};

export default React.memo(Occupation);

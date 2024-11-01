import { TParams } from "@/interfaces/params.interface";
import Filters from "@/page/Filters";
import React from "react";

const FiltersPage = ({ searchParams }: { searchParams: TParams }) => {
  return <Filters params={searchParams} />;
};

export default React.memo(FiltersPage);

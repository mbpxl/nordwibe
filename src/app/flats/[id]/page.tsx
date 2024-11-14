"use client";

import FlatDetail from "@/page/FlatDetail";
import { usePathname } from "next/navigation";
import React from "react";

const FlatDetailPage = () => {
  const pathname = usePathname();

  const id = pathname?.split("/").pop();
  console.log(id);
  if (!id || Array.isArray(id)) return <p>Loading...</p>;

  return <FlatDetail id={id} />;
};

export default React.memo(FlatDetailPage);

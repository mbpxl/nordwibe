import Medic from "@/page/Profile/Medic";
import React from "react";

export default React.memo(function MedicPage({
  params,
}: {
  params: { id: string };
}) {
  return <Medic id={params.id} />;
});

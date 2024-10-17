import Medic from "@/page/Profile/Medic";
import React from "react";

export default function MedicPage({ params }: { params: { id: string } }) {
  return <Medic id={params.id} />;
}

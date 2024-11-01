import Habits from "@/page/Profile/Habits";
import React from "react";

export default React.memo(function HabitsPage({
  params,
}: {
  params: { id: string };
}) {
  return <Habits id={params.id} />;
});

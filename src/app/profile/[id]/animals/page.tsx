import Animals from "@/page/Profile/Animals";
import React from "react";

const AnimalsPage = ({ params }: { params: { id: string } }) => {
  return <Animals id={params.id} />;
};

export default React.memo(AnimalsPage);

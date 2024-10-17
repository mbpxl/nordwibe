import Neighbors from "@/page/Neighbors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Соседи | Nordwibe",
  description: "Список всех соседей в вашем городе"
}

const NeighborsPage = () => {
  return <Neighbors />
}

export default NeighborsPage;
import Cities from "@/page/Cities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Города | Nordwibe",
  description: "Страница выбора города"
}

const CitiesPage = () => {
  return <Cities />
}

export default CitiesPage;
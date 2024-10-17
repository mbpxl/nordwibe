import { flats } from "@/config"
import FlatDetail from "@/page/FlatDetail"
import { Metadata } from "next/types"

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const flat = flats[Number(id)]

  return {
    title: `${flat ? flat.user.name : undefined} | Nordwibe`,
    description: `Детальная страница квартиры пользователя ${flat ? flat.user.name : undefined}`,
  }
}

const FlatDetailPage = ({ params }: { params: { id: string } }) => {
  return <FlatDetail id={params.id} />
}

export default FlatDetailPage;
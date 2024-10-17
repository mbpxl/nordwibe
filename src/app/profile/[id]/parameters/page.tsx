import { users } from "@/config";
import Parameters from "@/page/Profile/Parameters";
import { Metadata } from "next/types"

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const user = users[Number(id)]

  return {
    title: `Параметры | Nordwibe`,
    description: `Страница настроек пользователя ${user ? user.username : undefined}`,
  }
}

const ParametersPage = () => {
  return <Parameters />
}

export default ParametersPage;
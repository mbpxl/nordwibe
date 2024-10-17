import { TParams } from "@/interfaces/params.interface";
import Filters from "@/page/Filters";

const FiltersPage = ({ searchParams }: { searchParams: TParams }) => {
  return <Filters params={searchParams} />
}

export default FiltersPage;
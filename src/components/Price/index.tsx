import styles from "@/components/Price/styles.module.scss"
import FiltersInput from "../Input";
import { Dispatch, SetStateAction, FC } from "react"

interface IFiltersDispatch {
  setFiltersPriceTo: Dispatch<SetStateAction<number>>,
  setFiltersPriceFrom: Dispatch<SetStateAction<number>>,
}

const Price: FC<IFiltersDispatch> = (props) => {
  return <div className={styles.price}>
    <div>
      <h4>От.</h4>
      <FiltersInput {...props} type="from" page="flats" />
    </div>
    <div className="mt-4">
      <h4>До.</h4>
      <FiltersInput {...props} type="to" page="flats" />
    </div>
  </div>
}

export default Price;
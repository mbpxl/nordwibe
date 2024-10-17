"use client"

import styles from "@/components/Input/styles.module.scss"
import { FC, useState, Dispatch, SetStateAction } from "react"
import { useTypedSelector } from "@/hooks/selector.hook"
import { maxFlatPrice, maxUsersAge } from "@/config"

interface IFilterInput {
  type?: "to" | "from"
  page: "flats" | "neighbors"
  setFiltersPriceTo?: Dispatch<SetStateAction<number>>,
  setFiltersPriceFrom?: Dispatch<SetStateAction<number>>,
  setFiltersAgeTo?: Dispatch<SetStateAction<number>>,
  setFiltersAgeFrom?: Dispatch<SetStateAction<number>>,
}

const FiltersInput: FC<IFilterInput> = ({ setFiltersPriceFrom, setFiltersPriceTo, setFiltersAgeFrom, setFiltersAgeTo, type, page }) => {
  const price = useTypedSelector(selector => selector.filtersSlice.flats.price[type || "from"])
  const age = useTypedSelector(selector => selector.filtersSlice.neighbors.age[type || "from"])
  const [value, setValue] = useState<string>(String(page === "flats" ? price : age))

  return <div className={styles.input}>
    <input type="number" value={value} onChange={e => {
      let value = e.target.value
      if (value === "" || parseInt(value) < 0) value = "0"
      if (parseInt(value) > (page === "flats" ? maxFlatPrice : maxUsersAge)) value = String(page === "flats" ? maxFlatPrice : maxUsersAge)
      setValue(String(parseInt(value)))

      if (page === "flats") {
        if (type === "from") setFiltersPriceFrom && setFiltersPriceFrom(Number(value))
        else setFiltersPriceTo && setFiltersPriceTo(Number(value))
      }

      else if (page === "neighbors") {
        if (type === "from") setFiltersAgeFrom && setFiltersAgeFrom(Number(value))
        else setFiltersAgeTo && setFiltersAgeTo(Number(value))
      }
    }} />
  </div>
}

export default FiltersInput;
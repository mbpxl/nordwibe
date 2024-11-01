import styles from "@/components/Age/styles.module.scss";
import FiltersInput from "../Input";
import { Dispatch, SetStateAction, FC } from "react";
import React from "react";

export interface IFiltersDispatch {
  setFiltersAgeTo: Dispatch<SetStateAction<number>>;
  setFiltersAgeFrom: Dispatch<SetStateAction<number>>;
}

const Age: FC<IFiltersDispatch> = (props) => {
  return (
    <div className={styles.age}>
      <div>
        <h4>От.</h4>
        <FiltersInput {...props} type="from" page="neighbors" />
      </div>
      <div className="mt-4">
        <h4>До.</h4>
        <FiltersInput {...props} type="to" page="neighbors" />
      </div>
    </div>
  );
};

export default React.memo(Age);

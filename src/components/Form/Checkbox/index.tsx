"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Check {
    key: boolean
}

type FormInputProps = {
    name?: string;
    id: string;
    onChange?:React.Dispatch<React.SetStateAction<{
        id: number;
        val: boolean;
    }>>
    label: string;
    answer: Check[];
    index: number
};

export default function Checkbox(props: FormInputProps) {
    const [value, setValue] = useState<boolean>(false);
const [checkedClass,setCheckedClass] = useState<string>()
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange && props.onChange({id:props.index,val:!value});
        setValue(!value);
        if (e.target.checked) {
            setCheckedClass(styles.active)
        }
        else {
            setCheckedClass(styles.none)
        }
    }

    return (
            <label htmlFor={props.id} className={styles.checkbox_parent} id={checkedClass}>
                <input
                    className={styles.checkbox}
                    name={props.name}
                    type="checkbox"
                    id={props.id}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <label htmlFor={props.id}>{props.label}</label>
            </label>
    );
}

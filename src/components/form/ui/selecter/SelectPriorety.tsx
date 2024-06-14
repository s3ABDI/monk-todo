import React from "react";
import styles from "./SelectPriorety.module.scss";

const SelectPriorety: React.FC<{ setPriorety: (e: {text: string, color: string}) => void }> = ({ setPriorety }) => {
    const priorety = ["High", "Medium", "Low", "Critical", "Block"];
    const colors = ["red", "orange", "green", "purple", "gray"]
    const onSelect = (e: number) => {
        setPriorety({text:priorety[e], color: colors[e]});
    };

    return (
        <div className={styles.SelectPriorety}>
            {priorety.map((el, i) => {
                return (
                    <p key={i} onClick={() => onSelect(i)} style={{color: colors[i]}}>
                        {el}
                    </p>
                );
            })}
        </div>
    );
};

export default SelectPriorety;

import React from "react";
import styles from "./styles.module.scss";

export default ({ children, isActive, isComplete }) => (
    <div className={styles.step}>
        {children}
    </div>
);

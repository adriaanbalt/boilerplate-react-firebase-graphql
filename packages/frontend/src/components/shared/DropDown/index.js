import React from "react";
import styles from "./styles.module.scss";

export default ({ children, value, handleChange }) => (
  <select
    className={styles.dropdown}
    value={value}
    onChange={e => handleChange(e.target.value)}
  >
    {children}
  </select>
);

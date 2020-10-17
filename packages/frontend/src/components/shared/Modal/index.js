import React from "react";
import styles from "./styles.module.scss";
import { IoIosClose } from "react-icons/io";

export default ({ children, closeModal }) => {
  if (children) {
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.inner}>
            <IoIosClose size={40} onClick={closeModal} />
            {children}
          </div>
        </div>
        <div className={styles.background} onClick={closeModal}></div>
      </div>
    );
  } else {
    return <React.Fragment />;
  }
};

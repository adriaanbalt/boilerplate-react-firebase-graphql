import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default ({ index, id, title, price, creator, date, url }) => {
  return (
    <div className={styles.item}>
      <Link to={`/details/${id}`} className={styles.listItemLink}>
        {url && <img src={url} alt={title} />}
        <div className={styles.overlay}>
          <div className={styles.bottom}>
            <p>{title}</p>
            <p>{creator}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

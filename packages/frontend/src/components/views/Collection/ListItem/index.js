import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default ({ id, title, url }) => {
  return (
    <article className={styles.listItem}>
      <Link to={`/details/${id}`} className={styles.listItemLink}>
        {url && <img src={url} alt={title} />}
        <div className={styles.overlay}>
          <div className={styles.bottom}>
            <p>{title}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

import React from "react";
import styles from "./styles.module.scss";
import Arrow from "components/shared/graphics/Arrow";
import ArrowBack from "components/shared/graphics/ArrowBack";
import { Link } from "react-router-dom";

export default ({ onClick, children, to, back = false }) => (
    <Link to={to}>
        <h4 className={styles.button}>
            {
                back
                &&
                <ArrowBack />
            }
            <span>{children}</span>
            {
                !back
                &&
                <Arrow />
            }
        </h4>
    </Link>
);

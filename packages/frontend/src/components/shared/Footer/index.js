import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default ({ user }) => (
    <footer className={cx(styles.footer)}>
        <h1>Boilerplate React Firebase GraphQL</h1>
        <h4>Build by Adriaan Balt</h4>
        {user && (
            <nav className={styles.navContainer}>
                <Link to={"/privacy"}>Privacy</Link>
                <Link to={"/terms"}>Terms</Link>
            </nav>
        )}
    </footer>
);

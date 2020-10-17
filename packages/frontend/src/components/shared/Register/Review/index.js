import styles from "./styles.module.scss";
import React from "react";
import Button from "components/shared/Button";

export default (props) => (
    <div>
        <h3>Review</h3>
        <div className={styles.buttons}>
            <Button className={styles.buttons} onClick={props.previous}>Back</Button>
            <Button onClick={props.next}>Next</Button>
        </div>
    </div>
);

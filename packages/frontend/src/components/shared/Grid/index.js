import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";
import Masonry from "react-masonry-css";

export default ({ list }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <Masonry
            className={styles.container}
            columnClassName={styles.item}
            breakpointCols={breakpointColumnsObj}>
            {
                list.map((work, index) => (
                    <ListItem {...work} index={index} />
                ))
            }
        </Masonry>
    );
}
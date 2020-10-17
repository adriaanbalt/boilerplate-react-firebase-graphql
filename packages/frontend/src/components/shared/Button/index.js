import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import cx from "classnames";

export default ({ to, onClick, children, className }) => (
	<React.Fragment>
		{
			to
			&&
			<Link className={cx(styles.button, className)} to={to}>
				{children}
			</Link>
		}
		{
			onClick
			&&
			<div className={cx(styles.button, className)} onClick={onClick}>
				{children}
			</div>
		}
	</React.Fragment>
);

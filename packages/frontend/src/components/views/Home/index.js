import React from "react";
import styles from "./styles.module.scss";

export default (props) => {
	return (
		<section className={styles.ViewHome}>
			<div className='inner-wrapper'>
				<div className={styles.content}>
					<div>
						<h4>
							Welcome to the React, Firebase, GraphQL boilerplate.
						</h4>
					</div>
				</div>
			</div>
		</section>
	);
};

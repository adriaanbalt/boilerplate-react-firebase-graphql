import React from "react";
import { View } from "react-native";
import styles from "./styles.module.scss";

export default (props) => {
	return (
		<View
			style={{
				background: "#0f0",
			}}>
			<h4 className={styles.ViewHome}>
				Welcome to the React, Firebase, GraphQL boilerplate.
			</h4>
		</View>
	);
};

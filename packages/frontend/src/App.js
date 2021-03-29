import React from "react";
import { View } from "react-native";

import AppNavigator from "./navigator";

export default () => {
	console.log("hi!!");
	return (
		<React.Fragment>
			<View>hi</View>
			<AppNavigator />
		</React.Fragment>
	);
};

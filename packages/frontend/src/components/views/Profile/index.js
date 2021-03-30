import React from "react";
import Button from "components/shared/Button";
import { Text, View } from "react-native";
import Styles from "lib/Styles";

export default (props) => {
	const handleLogout = () => {
		// does something
	};
	return (
		<View>
			<Text style={Styles.h1}>Account Settings</Text>
			{props.user && props.user.uid && <p>id: {props.user.uid}</p>}
			<Button onClick={handleLogout}>Logout</Button>
		</View>
	);
};

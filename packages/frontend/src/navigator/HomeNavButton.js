import React from "react";
import { StyleSheet, View, Animated, Easing, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Variables from "../../constants/Variables";

const styles = StyleSheet.create({
	container: {
		width: Variables.ProfileNavBtnDiameter,
		height: Variables.ProfileNavBtnDiameter,
		shadowOffset: { width: 0, height: 0 },
		shadowColor: Variables.shadowColor,
		shadowOpacity: Variables.shadowOpacity,
		shadowRadius: Variables.shadowRadius,
	},
	icon: {
		shadowOffset: { width: 0, height: 0 },
		shadowColor: Variables.shadowColor,
		shadowOpacity: Variables.shadowOpacity,
		shadowRadius: Variables.shadowRadius,
	},
});

class HomeNavButton extends React.Component {
	state = {
		spinValue: new Animated.Value(0)
	}

	componentDidMount = () => {
		// Second interpolate beginning and end values (in this case 0 and 1)
		Animated.loop(
			Animated.timing(
				this.state.spinValue,
				{
					toValue: 1,
					duration: 50000,
					easing: Easing.linear,
					useNativeDriver: true,
				}
			)
		).start()
	}
	render() {
		const spin = this.state.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '-360deg']
		})
		// <MovieReel
		// 	style={[styles.icon]}
		// 	color={this.props.tintColor} />
		return (
			<Animated.View style={[
				styles.container,
				// {
				// 	transform: [{
				// 		rotate: spin
				// 	}]
				// }
			]}>
				<Ionicons
					name={"md-home"}
					size={30}
					color={this.props.tintColor}
					style={styles.icon}
				/>

			</Animated.View>
		);
	}
}

export default HomeNavButton;

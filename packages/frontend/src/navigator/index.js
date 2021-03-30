import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import HomeScreen from "components/views/Home";
import ProfileScreen from "components/views/Profile";
// import ProductDetailsScreen from "../components/views/ProductDetailsScreen";

import PAGE_TRANSITIONS from "lib/PAGE_TRANSITIONS";
import Colors from "lib/Colors";

const MyTheme = {
	dark: false,
	colors: {
		background: Colors.background,
	},
};

function Tabs() {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName='Home'
			tabBarOptions={{
				activeTintColor: "#111",
				inactiveTintColor: "#999",
				style: {
					bottom: 30,
					justifyContent: "center",
					left: "20%",
					width: "60%",
					paddingBottom: 10,
					borderRadius: 20,
					position: "absolute",
					borderTopColor: "transparent",
					backgroundColor: "#eee",
				},
			}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

export default function AppNavigator() {
	const Stack = createStackNavigator();

	const config = {
		screens: {
			Tabs: {
				screens: {
					Home: "",
					Profile: "profile",
				},
			},
		},
	};

	const linking = {
		prefixes: ["https://mychat.com", "mychat://"],
		config,
	};

	return (
		<NavigationContainer
			linking={linking}
			theme={MyTheme}
			onStateChange={(prevState, currentState, action) => {
				// const currentRouteName = this.getActiveRouteName(currentState);
				// const previousRouteName = this.getActiveRouteName(prevState);
				// if (previousRouteName !== currentRouteName) {
				// 	AppAnalytics.viewedScreen(currentRouteName);
				// }
			}}>
			<Stack.Navigator mode='modal' initialRouteName='Tabs'>
				<Stack.Screen
					name='Tabs'
					component={Tabs}
					options={{
						headerShown: false,
					}}
				/>
				{/* <Stack.Screen
				name='ProductDetailsScreen'
				component={ProductDetailsScreen}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
					...PAGE_TRANSITIONS.MODAL,
				}}
			/> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

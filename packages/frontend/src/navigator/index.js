import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

function HomeStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
				options={({ route }) => {
					return { route, headerShown: false };
				}}
			/>
		</Stack.Navigator>
	);
}
function ProfileStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='ProfileScreen'>
			<Stack.Screen
				name='ProfileScreen'
				component={ProfileScreen}
				options={{
					headerShown: false,
					...PAGE_TRANSITIONS.HORIZONTAL_IN_SCALE_LAST,
				}}
			/>
			<Stack.Screen
				name='UserScreen'
				component={ProfileScreen}
				options={{
					headerShown: false,
					...PAGE_TRANSITIONS.HORIZONTAL_IN_SCALE_LAST,
				}}
			/>
		</Stack.Navigator>
	);
}
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
			<Tab.Screen name='Home' component={HomeStack} />
			<Tab.Screen
				name='Profile'
				component={ProfileStack}
				listeners={({ navigation, route }) => ({
					tabPress: (e) => {
						e.preventDefault();
						navigation.navigate("Profile", {
							screen: "ProfileScreen",
							params: { userId: null },
						});
					},
				})}
			/>
		</Tab.Navigator>
	);
}

function App() {
	const Stack = createStackNavigator();
	return (
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
	);
}

export default function AppNavigator() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer
			theme={MyTheme}
			onStateChange={(prevState, currentState, action) => {
				// const currentRouteName = this.getActiveRouteName(currentState);
				// const previousRouteName = this.getActiveRouteName(prevState);
				// if (previousRouteName !== currentRouteName) {
				// 	AppAnalytics.viewedScreen(currentRouteName);
				// }
			}}>
			<Stack.Navigator
				initialRouteName='App'
				screenOptions={{
					headerStyle: { elevation: 0 },
				}}>
				<Stack.Screen
					name='App'
					component={App}
					options={{
						headerShown: false,
						gestureEnabled: false,
						...PAGE_TRANSITIONS.FADE_IN,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PAGE_TRANSITIONS from "../utils/PAGE_TRANSITIONS";
import Variables from "../constants/Variables";

import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
// import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import SearchScreen from "../screens/Search";

import ModalFriend from "../modals/ModalFriend";
import ModalSettings from "../modals/ModalSettings";
import ModalLoginPhone from "../modals/ModalLoginPhone";
import ModalProfileEdit from "../modals/ModalProfileEdit";
import ModalAddMovie from "../modals/ModalAddMovie";

import HomeNavButton from "./HomeNavButton";
import SearchNavButton from "./SearchNavButton";
import ProfileNavButton from "./ProfileNavButton";

const MyTheme = {
	dark: false,
	colors: {
		// background: Variables.popColor,
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
function SearchStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='SearchScreen' mode='modal'>
			<Stack.Screen
				name='SearchScreen'
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='SearchResults'
				component={SearchResults}
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
				showLabel: false,
				activeTintColor: Variables.activeTabColor,
				inactiveTintColor: Variables.inactiveTabColor,
				style: {
					bottom: 30,
					justifyContent: "center",
					left: "20%",
					width: "60%",
					paddingBottom: 10,
					borderRadius: 20,
					position: "absolute",
					borderTopColor: "transparent",
					backgroundColor: Variables.backgroundColorTransparent,
					shadowOffset: { width: 0, height: 0 },
					shadowColor: Variables.shadowColor,
					shadowOpacity: 0.75,
					shadowRadius: 5,
				},
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					if (route.name === "Profile") {
						return (
							<ProfileNavButton
								tintColor={color}
								focused={focused}
							/>
						);
					}
					if (route.name === "Home") {
						return (
							<HomeNavButton
								tintColor={color}
								focused={focused}
							/>
						);
					}
					if (route.name === "Search") {
						return (
							<SearchNavButton
								tintColor={color}
								focused={focused}
							/>
						);
					}
				},
			})}>
			<Tab.Screen name='Home' component={HomeStack} />
			<Tab.Screen name='Search' component={SearchStack} />
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
			<Stack.Screen
				name='MovieDetailsScreen'
				component={MovieDetailsScreen}
				options={({ route: { params } }) => {
					const verticalHitArea =
						params && params.isDrawerOpen
							? 100
							: Variables.videoplayerHeight;
					return {
						headerShown: false,
						gestureResponseDistance: {
							vertical: verticalHitArea,
						},
						...PAGE_TRANSITIONS.MODAL,
					};
				}}
			/>
			<Stack.Screen
				name='ModalFriend'
				component={ModalFriend}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
					...PAGE_TRANSITIONS.MODAL,
				}}
			/>
			<Stack.Screen
				name='ModalAddMovie'
				component={ModalAddMovie}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
				}}
			/>
			<Stack.Screen
				name='ProfileModalSettings'
				component={ModalSettings}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
					...PAGE_TRANSITIONS.MODAL,
				}}
			/>
			<Stack.Screen
				name='ModalLoginPhone'
				component={ModalLoginPhone}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
					...PAGE_TRANSITIONS.MODAL,
				}}
			/>
			<Stack.Screen
				name='ModalProfileEdit'
				component={ModalProfileEdit}
				options={{
					headerShown: false,
					gestureResponseDistance: {
						vertical: 600,
					},
					...PAGE_TRANSITIONS.MODAL,
				}}
			/>
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
				initialRouteName='AuthLoadingScreen'
				screenOptions={{
					headerStyle: { elevation: 0 },
				}}>
				<Stack.Screen
					name='AuthLoadingScreen'
					component={AuthLoadingScreen}
					options={{
						headerShown: false,
						gestureEnabled: false,
						...PAGE_TRANSITIONS.FADE_IN,
					}}
				/>
				<Stack.Screen
					name='App'
					component={App}
					options={{
						headerShown: false,
						gestureEnabled: false,
						...PAGE_TRANSITIONS.FADE_IN,
					}}
				/>
				<Stack.Screen
					name='Onboarding'
					component={Onboarding}
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

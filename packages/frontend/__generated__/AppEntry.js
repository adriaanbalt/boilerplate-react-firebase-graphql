// @generated by expo-yarn-workspaces

import "expo/build/Expo.fx";
import { activateKeepAwake } from "expo-keep-awake";
import registerRootComponent from "expo/build/launch/registerRootComponent";

import App from "../src";

if (__DEV__) {
	activateKeepAwake();
}

registerRootComponent(App);

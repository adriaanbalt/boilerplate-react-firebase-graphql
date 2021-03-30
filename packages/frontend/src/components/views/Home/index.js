import { useProducts } from "contexts/ProductsContext";
import Styles from "lib/Styles";
import React from "react";
import { View } from "react-native";

function Home(props) {
	const { getProducts } = useProducts();
	getProducts();
	return (
		<View>
			<h4 style={Styles.h1}>
				Welcome to the React, Firebase, GraphQL boilerplate.
			</h4>
		</View>
	);
}

Home.propTypes = {};

export default Home;

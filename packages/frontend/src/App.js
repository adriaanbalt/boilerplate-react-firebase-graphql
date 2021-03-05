import React, { Component } from "react";

import Header from "components/shared/Header";
import Modal from "components/shared/Modal";
import Footer from "components/shared/Footer";
import AppNavigator from "navigator";

export default App = () => {
	return (
		<React.Fragment>
			<Modal />
			<Header />
			<AppNavigator />
			<Footer />
		</React.Fragment>
	);
};

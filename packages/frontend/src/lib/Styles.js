import Colors from "./Colors";

export default {
	h1: {
		color: Colors.font,
		fontSize: 35,
		fontWeight: "bold",
	},
	h2: {
		color: Colors.font,
		fontSize: 30,
		fontWeight: "bold",
	},
	h3: {
		color: Colors.font,
		fontSize: 25,
		fontWeight: "bold",
	},
	h4: {
		color: Colors.font,
		fontSize: 20,
	},
	h5: {
		color: Colors.font,
		fontSize: 18,
	},
	h6: {
		color: Colors.font,
		fontSize: 15,
	},
	h7: {
		color: Colors.font,
		fontSize: 13,
	},
	h8: {
		color: Colors.font,
		fontSize: 11,
	},
	h9: {
		color: Colors.font,
		fontSize: 10,
	},
	paragraph: {
		color: Colors.font,
		fontSize: 15,
		lineHeight: 17,
	},
	shadow: {
		shadowColor: Colors.shadow,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	modal: {
		position: "absolute",
		zIndex: 1,
		display: "flex",
		backgroundColor: Colors.modal,
		alignItems: "center",
		width: "100%",
		height: "80%",
	},
	button: {
		backgroundColor: Colors.accent,
		fontWeight: "bold",
		fontStyle: "italic",
	},
};

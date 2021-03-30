const { ApolloError, ValidationError } = require("apollo-server-express");

const admin = require("firebase-admin");
module.exports = (workId) => {
	return admin
		.firestore()
		.collection("work")
		.doc(workId)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return { id: doc.id, ...doc.data() };
			} else {
				const error = new ValidationError(
					"[work] Document does not exist",
				);
				console.error(error);
				return null;
			}
		})
		.catch((err) => console.log("Error getting document", err));
};

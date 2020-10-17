const { ApolloError, ValidationError } = require("apollo-server-express");
const admin = require("firebase-admin");

module.exports = async (emailAddress) => {
	try {
		const query = admin
			.firestore()
			.collection("users")
			.where("email", "==", emailAddress)
		const queryResults = await query.get().catch((err) => console.log("Error getUserIdByEmail()", err));
		return queryResults.docs.map(doc => doc.id)[0]
	} catch (error) {
		throw new ApolloError(`Resolver Mutation GetuserById() ${error}`);
	}
};

const { ValidationError } = require("apollo-server-express");
const admin = require("firebase-admin");
module.exports = async (
	property,
	value,
	status = null,
	transactionCollectionName = "transactions",
) => {
	let query = admin
		.firestore()
		.collection(transactionCollectionName)
		.where(property, "==", value);
	if (status !== null) {
		query = query.where("status", "==", status);
	}
	return query
		.get()
		.then((querySnapshot) => {
			if (querySnapshot) {
				const results = [];
				querySnapshot.forEach((doc) => {
					const docId = doc.id;
					const docData = doc.data();
					// doc.data() is never undefined for query doc snapshots
					results.push({ id: docId, ...docData });
				});
				return results;
			} else {
				return new ValidationError(
					`[${transactionCollectionName}] Documents do not exist`,
				);
			}
		})
		.catch((err) => console.log("Error getting document", err));
};

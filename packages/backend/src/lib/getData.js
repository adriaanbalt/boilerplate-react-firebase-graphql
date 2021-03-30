const { ValidationError } = require("apollo-server-express");
const admin = require("firebase-admin");
module.exports = (collectionName, wherePairs) => {
	let query = admin.firestore().collection(collectionName);

	for (var i = 0; i < wherePairs.length; i++) {
		query = query.where(
			wherePairs[i].property,
			wherePairs[i].condition,
			wherePairs[i].value,
		);
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
					`[${collectionName}] Documents do not exist`,
				);
			}
		})
		.catch((err) =>
			console.log(`[${collectionName}] Error getting document`, err),
		);
};

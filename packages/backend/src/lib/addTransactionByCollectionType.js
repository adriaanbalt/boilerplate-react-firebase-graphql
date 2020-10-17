const admin = require("firebase-admin");
module.exports = (value, transactionCollectionName = "transactions") => {
	return admin
		.firestore()
		.collection(transactionCollectionName)
		.add(value)
		.then((docRef) => docRef.id)
		.catch((error) => {
			console.error(
				`[${transactionCollectionName} collection] Resolve.setTransactionByType() Error adding document: `,
				error,
			);
		});
};

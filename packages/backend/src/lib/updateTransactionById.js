const admin = require("firebase-admin");
module.exports = (transactionId, updateData) => {
	return admin
		.firestore()
		.collection("transactions")
		.doc(transactionId)
		.update(updateData)
		.then((res) => {
			console.log("Document successfully updated!", res);
			return;
		})
		.catch((error) => {
			console.error(
				`[transactions collection] updateTransactionById() Error adding document: `,
				error
			);
		});
};

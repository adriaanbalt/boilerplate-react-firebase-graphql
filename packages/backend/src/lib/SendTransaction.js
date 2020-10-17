const { ApolloError, ValidationError } = require("apollo-server-express");
const admin = require("firebase-admin");
const objectAssignDeep = require("object-assign-deep");
const addTransactionByCollectionType = require("../lib/addTransactionByCollectionType");

module.exports = async (transactionData) => {
	try {
		// if the transactionData.nextUserId is an email, we need to get the user id for that user
		if (transactionData.nextUserId.includes("@")) {
			const query = await admin
				.firestore()
				.collection("users")
				.where("email", "==", transactionData.nextUserId)
				.get()

			nextUser = query.docs.map(doc => objectAssignDeep({}, doc, doc.data()))[0]
			transactionData = objectAssignDeep({}, transactionData, {
				nextUserId: nextUser.id,
				nextUser: {
					email: nextUser.email,
					displayName: nextUser.displayName,
				},
			});
		} else {
			// check if the nextUserId exists
			const nextUser = await admin
				.firestore()
				.collection("users")
				.where("id", "==", transactionData.nextUserId)
				.get()
				.then((querySnapshot) => {
					if (querySnapshot) {
						let nextId = null;
						querySnapshot.forEach((doc) => {
							nextId = doc.data();
							return;
						});
						return nextId;
					} else {
						return new ValidationError(
							"[SendTransaction] Documents do not exist",
						);
					}
				})
				.catch((err) => console.log("Error getting document", err));

			transactionData = objectAssignDeep({}, transactionData, {
				nextUserId: nextUser.id,
				nextUser: {
					email: nextUser.email,
					displayName: nextUser.displayName,
				},
			});
		}
		console.log('transactionData', transactionData)
		transactionData = objectAssignDeep({}, transactionData, {
			createDate: Date.now(),
		});
		const transactionId = await addTransactionByCollectionType(
			transactionData,
		);
		transactionData = objectAssignDeep({}, transactionData, {
			id: transactionId,
			// TODO include success or failure info
			success: true,
			error: null,
		});
		// TODO notify the user whose goign to receive the transaction
		return transactionData;
	} catch (error) {
		throw new ApolloError(`SendTransaction() ${error}`);
	}
};

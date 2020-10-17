const { ApolloError } = require("apollo-server-express");
const admin = require("firebase-admin");
const objectAssignDeep = require("object-assign-deep");
const TRANSACTION_STATUS = require("../../enums/TRANSACTION_STATUS");
module.exports = async (_, data) => {
	try {
		const newWork = objectAssignDeep({}, data, {
			createdDate: Date.now(),
			updateDate: Date.now(),
			// thumbnail: {
			// 	url: data.url,
			// 	title: data.title,
			// },
			offerOwnerId: null,
		});
		// add new WORK to the work collection
		const newWorkID = await admin
			.firestore()
			.collection("work")
			.add(newWork)
			.then((docRef) => docRef.id)
			.catch((error) => {
				console.error(
					"[work collection] Resolve.addProduct() Error adding document: ",
					error,
				);
			});
		// add image
		const newImage = {
			workId: newWorkID,
			url: data.url,
			title: data.title,
		};
		await admin
			.firestore()
			.collection("images")
			.add(newImage)
			.then((docRef) => docRef.id)
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
		// add new transaction
		const transactionData = {
			createDate: Date.now(),
			workId: newWorkID,
			workTitle: newWork.title,
			previousUserId: null,
			nextUserId: data.ownerId,
			properties: null,
			status: TRANSACTION_STATUS.new,
		};
		await admin
			.firestore()
			.collection("transactions")
			.add(transactionData)
			.then((docRef) => docRef.id)
			.catch((error) => {
				console.error(
					"[transactions collection] Resolve.addProduct() Error adding document: ",
					error,
				);
			});

		// TODO generate DEED??
		// TODO update blockchain??

		return objectAssignDeep({}, { id: newWorkID }, data);
	} catch (error) {
		throw new ApolloError(`Resolver mutation addProduct() ${error}`);
	}
};

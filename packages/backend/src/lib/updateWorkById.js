const admin = require("firebase-admin");
module.exports = async (workId, data) => {
	const res = await admin
		.firestore()
		.collection("work")
		.doc(workId)
		.update(data)
		.then(() => {
			console.log("Document successfully updated!");
			return;
		})
		.catch((error) => {
			console.error(
				"[UpdateWorkById] Error updating work document: ",
				error,
			);
		});
	return res;
};

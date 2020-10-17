const { ApolloError } = require("apollo-server-express");
const objectAssignDeep = require("object-assign-deep");
const getData = require("../../lib/getData");
const getImagesByWorkIdArr = require("../../lib/getImagesByWorkIdArr");
module.exports = async (_, args) => {
	try {
		let id = args.userId;
		if (id.includes("@")) {
			id = getUserIdByEmail(id);
		}
		let works = await getData("work", [
			{
				property: "ownerId",
				condition: "==",
				value: id
			},
		]);
		// TODO this needs to be refactored.  maybe instead of looking for a null property, look for a property that is true (vs false)
		// although this isn't sooo bad since i'm not making any new queries
		return works.filter(work => !work.offerOwnerId)
	} catch (error) {
		throw new ApolloError(
			`Resolver Query GetCollection() ${error}`,
		);
	}
};

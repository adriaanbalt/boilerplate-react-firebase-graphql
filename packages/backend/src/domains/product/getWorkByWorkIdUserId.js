const { ApolloError } = require("apollo-server-express");
const objectAssignDeep = require("object-assign-deep");
const getUserById = require("../../lib/getUserById");
const getWorkByWorkId = require("../../lib/getWorkByWorkId");
const getData = require("../../lib/getData");
const TRANSACTION_STATUS = require("../../enums/TRANSACTION_STATUS");
module.exports = async (_, args) => {
	try {
		// get the work details
		const work = await getWorkByWorkId(args.workId);
		// get owner details
		const owner = await getUserById(work.ownerId);
		// get creator details
		const creator = await getUserById(work.creatorId);
		// get user who the work is offered to
		ret = objectAssignDeep(
			{},
			work,
			{ creator },
			{ owner },
		);
		return ret;
	} catch (error) {
		throw new ApolloError(`Resolver Query getWorkByWorkId() ${error}`);
	}
};

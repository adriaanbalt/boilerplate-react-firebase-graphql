// mutations
const updateUser = require("./domains/user/updateUser");
const addProduct = require("./domains/product/addProduct");

// queries
const getWorkByWorkIdUserId = require("./domains/product/getWorkByWorkIdUserId");
const getCollection = require("./domains/collections/GetCollection");
const getUser = require("./domains/user/getUser");

module.exports = {
	Query: {
		getWorkByWorkIdUserId,
		getCollection,
		getUser,
	},
	Mutation: {
		updateUser,
		addProduct,
	},
};
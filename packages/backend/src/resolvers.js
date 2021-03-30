// products
const getProducts = require("./domains/product/getProducts");
const addProduct = require("./domains/product/addProduct");

// user
const getUser = require("./domains/user/getUser");
const updateUser = require("./domains/user/updateUser");

module.exports = {
	Query: {
		getProducts,
		getUser,
	},
	Mutation: {
		updateUser,
		addProduct,
	},
};

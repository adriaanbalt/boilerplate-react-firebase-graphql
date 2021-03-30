const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Query {
		_: Boolean
		getProducts(userId: ID!): Product
		getUser(id: String!): User
	}

	type Mutation {
		updateUser(userId: ID!, name: String!): User
		addProduct(title: String!, description: String): Product
	}
	type User {
		id: ID!
		displayName: String
		phoneNumber: String
		createdDate: Int
		lastSignInDate: Int
	}

	type Product {
		id: ID! # unique id
		ownerId: ID! # current owner
		title: String!
		description: String
		createdDate: Int
		updatedDate: Int
	}
`;

module.exports = typeDefs;

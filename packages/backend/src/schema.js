const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Query {
		_: Boolean
		getWorkByWorkIdUserId(workId: ID!, userId: ID!): Work
		getUser(id: String!): User
		getCollection(userId: ID!): [Work]
	}

	type Mutation {
		updateUser(userId: ID!, name: String!): User
		addProduct(
			creatorEmail: String
			creatorId: ID!
			title: String!
			url: String
			year: String
			description: String
		): Work

	}
	type User {
		id: ID!
		email: String!
		displayName: String
		avatarURL: String
		phoneNumber: String
		createdDate: Int
		lastSignInDate: Int
	}

	type Work {
		id: ID! # unique id
		ownerId: ID! # current owner
		creatorId: ID! # user who created the art
		creator: User! # full object of all the creator information
		owner: User! # full object of all the owner's information
		title: String!
		description: String
		price: Int
		url: String
		status: String
		transactions: [Transaction]
		createdDate: Int
		updatedDate: Int
	}

	type Transaction {
		id: ID!
		createdDate: String
		previousUserId: ID
		nextUserId: ID!
		nextUser: User
		workId: ID!
		properties: TransactionProperties
		status: String
		success: Boolean
		error: String
	}

	type TransactionProperties {
		salePrice: Int
		paymentSchedule: PaymentSchedule
	}
	type PaymentSchedule {
		installments: Int
		frequency: Int
		completionDate: Int
	}

	input InputTransactionProperties {
		salePrice: Int
		royaltyPercentage: Int
		dealerPercentage: Int
		fabricationCost: Int
		paymentSchedule: InputPaymentSchedule
	}
	input InputPaymentSchedule {
		installments: Int
		frequency: Int
		completionDate: Int
	}

	type Image {
		id: ID!
		workId: ID!
		url: String!
		title: String
	}

`;

module.exports = typeDefs;

import gql from "graphql-tag";

export const GET_WORK_BY_WORKID_USERID = gql`
	query GetWorkByWorkIdUserId($workId: ID!, $userId: ID!) {
		getWorkByWorkIdUserId(workId: $workId, userId: $userId) {
			id
			title
			url
			owner {
				id
				displayName
				email
			}
			creator {
				id
				displayName
				email
			}
			transactions {
				createDate
				nextUserId
				previousUserId
				status
				nextUser {
					email
					displayName
				}
				properties {
					salePrice
					royaltyPercentage
				}
			}
		}
	}
`;


export const ADD_PRODUCT = gql`
	mutation addProduct(
		$creatorEmail: String!
		$ownerId: ID!
		$creatorId: ID!
		$title: String!
		$url: String
		$year: String
		$description: String
	) {
		response: addProduct(
			creatorEmail: $creatorEmail
			ownerId: $ownerId
			creatorId: $creatorId
			title: $title
			url: $url
			year: $year
			description: $description
		) {
			ownerId
			title
			id
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($userId: ID!, $name: String!) {
		updateUser(userId: $userId, name: $name) {
			id
			displayName
			email
		}
	}
`;

export const GET_WORK_BY_USERTYPE = gql`
	query GetIncomingOffers(
		$userType: String!
		$status: String!
		$userId: ID!
	) {
		response: GetIncomingOffers(
			userType: $userType
			status: $status
			userId: $userId
		) {
			id
			title
			url
		}
	}
`;

export const GET_COLLECTION = gql`
	query getCollection($userId: ID!) {
		response: getCollection(userId: $userId) {
			id
			title
			url
		}
	}
`;
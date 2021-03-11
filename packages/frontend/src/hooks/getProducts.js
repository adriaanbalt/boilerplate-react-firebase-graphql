import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCTS_BY_USER_ID = gql`
	query getProductsByUserId($userId: ID!) {
		response: getProductsByUserId(userId: $userId) {
			id
			title
		}
	}
`;

export default (userId) => {
	return useQuery(GET_PRODUCTS_BY_USER_ID, {
		fetchPolicy: "cache-and-network",
		variables: {
			userId,
		},
	});
};

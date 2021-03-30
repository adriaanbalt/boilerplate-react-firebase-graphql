import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCTS_BY_USER_ID = gql`
	query getProducts($userId: ID!) {
		response: getProducts(userId: $userId) {
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

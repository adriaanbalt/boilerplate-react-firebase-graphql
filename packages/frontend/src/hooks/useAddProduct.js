import { useMutation, gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
	mutation addProduct($userId: ID!, $title: String!, $description: String) {
		response: addProduct(
			userId: $userId
			title: $title
			description: $description
		) {
			id
			userId
			title
		}
	}
`;

export default () => {
	let [ADD_PRODUCT] = useMutation(ADD_PRODUCT);
	return ADD_PRODUCT;
};

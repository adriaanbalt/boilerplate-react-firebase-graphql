import { useMutation, gql } from "@apollo/client";

const ADD_PRODUCT = gql`
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
	const [addProduct, { called, loading, data }] = useMutation(ADD_PRODUCT);
	return [addProduct, { called, loading, data }];
};

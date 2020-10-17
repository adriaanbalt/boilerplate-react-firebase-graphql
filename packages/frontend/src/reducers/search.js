import { PERFORM_SEARCH } from "actions";

const initialState = {
	results: [],
	query: "",
};
export default (state = initialState, action) => {
	switch (action.type) {
		case PERFORM_SEARCH:
			return {
				...state,
				...action, // this includes both 'results' and 'query' properties
			};

		default:
			return state;
	}
};

import { PERFORM_SEARCH } from "actions";
import SearchReducer from "./search";

// after performing a search make sure that the query is stored within the reducer
test("PERFORM_SEARCH makes a search query and sets the query param", () => {
	const startingState = {
		results: [],
		query: "",
	};

	const action = {
		type: PERFORM_SEARCH,
		query: "river",
	};

	const state = SearchReducer(startingState, action);
	expect(state.query).toEqual("river");
});

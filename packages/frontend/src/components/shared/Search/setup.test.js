import { PERFORM_SEARCH } from "actions";
import PostsReducer from "reducers/posts";
import SearchReducer from "reducers/search";
import SearchSetup from "./setup";

// dummy post data
const postsReducerStartingState = {
	posts: {
		"001": {
			id: "001",
			title: "river",
			body: "some copy",
		},
		"002": {
			id: "002",
			title: "mountain",
			body: "some copy",
		},
		"003": {
			id: "003",
			title: "other copy",
			body: "river",
		},
	},
};

const postsState = PostsReducer(postsReducerStartingState, {});
const idx = SearchSetup.createFromData(
	Object.entries(postsState.posts).map((post) => post[1]),
);

// make sure that the index was correctly generated based on the above dummy data
test("SEARCH Was a search index created?", async () => {
	expect(idx.invertedIndex).toHaveProperty("river");
});

// make sure that the results worked correctly and that the search util is functioning properly
test("SEARCH Did search return correct results based on query?", async () => {
	const searchQuery = "river";
	const results = await SearchSetup.performSearch(searchQuery);
	expect(results).toEqual(["001", "003"]);
});

// run a complete search and make sure that the correct results are properly stored in the search reducer
test("SEARCH After searching are the results stored in the search reducer?", async () => {
	const searchReducerStartingState = {
		results: [],
		query: "",
	};

	const searchQuery = "river";

	const results = await SearchSetup.performSearch(searchQuery);

	const action = {
		type: PERFORM_SEARCH,
		query: searchQuery,
		results,
	};
	const state = SearchReducer(searchReducerStartingState, action);
	expect(state.results).toEqual(["001", "003"]);
});

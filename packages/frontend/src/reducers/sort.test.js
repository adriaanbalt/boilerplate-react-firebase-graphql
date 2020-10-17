import { SELECT_SORT_OPTION } from "actions";
import SortReducer from "./sort";

// selecting a sorted item stores the correctly selected sort
test("SORT Can I select a sort and update the state?", () => {
	const startingState = {
		selected: "created",
	};

	const sortSelection = "chronological";
	const action = {
		type: SELECT_SORT_OPTION,
		selected: sortSelection,
	};

	const state = SortReducer(startingState, action);
	expect(state.selected).toEqual(sortSelection);
});

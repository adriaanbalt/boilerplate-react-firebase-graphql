import { SELECT_SORT_OPTION } from "actions";

/* 
  src/reducers/sort.js
*/
const initialState = {
	sortOptions: {
		// converted to an object so the selected ID can be used to lookup the sort type quickly rather than looping over the entire array each time a selection is made, in exchange I have to loop over the entries and reformat the data in App.js
		created: {
			id: "created", // unique Id without spaces to be used as the "selected" property in this reducer
			label: "Chronological", // what the user sees in the dropdown
			type: "number", // the type of sort (used by the List View to make the comparable function more dynamic based on the data)
		},
		title: {
			id: "title", // unique Id without spaces to be used as the "selected" property in this reducer
			label: "Alphabetical", // what the user sees in the dropdown
			type: "letter", // the type of sort (used by the List View to make the comparable function more dynamic based on the data)
		},
		timeToRead: {
			id: "timeToRead", // unique Id without spaces to be used as the "selected" property in this reducer
			label: "Time to Read", // what the user sees in the dropdown
			type: "number", // the type of sort (used by the List View to make the comparable function more dynamic based on the data)
		},
		favorite: {
			id: "favorite", // unique Id without spaces to be used as the "selected" property in this reducer
			label: "Favorite", // what the user sees in the dropdown
			type: "boolean", // the type of sort (used by the List View to make the comparable function more dynamic based on the data)
		},
	},
	selected: "created",
};
export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_SORT_OPTION:
			return {
				...state,
				selected: action.selected,
			};

		default:
			return state;
	}
};

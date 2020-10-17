import { TOGGLE_MODAL, TOGGLE_DRAWER, TOGGLE_INVERT } from "actions";

const initialState = {
	invert: false,
	modal: {
		children: null,
	},
};
export default (state = initialState, action) => {
	console.log("action", action)
	switch (action.type) {
		case TOGGLE_DRAWER:
			return {
				...state,
				drawer: !state.drawer,
			};

		case TOGGLE_MODAL:
			return {
				...state,
				modal: action,
			};

		case TOGGLE_INVERT:
			return {
				...state,
				invert: action.value,
			};

		default:
			return state;
	}
};

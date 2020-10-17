import Analytics from "lib/analytics";
import { TOGGLE_MODAL, SELECT_SORT_OPTION, PERFORM_SEARCH } from "actions";

/**
 * This wrapper function sends the data to the server
 * @param {Object} data the event data to send
 */
const sendEvent = (data, ml = null) => {
	Analytics.track({
		// some univeral constants
		...data,
	});
};

export default (store) => (next) => (action) => {
	// for specific actions, run analytics calls to the end point
	// useful to consolidate analytics into a single place as opposed to spreading it across the app

	if (action.type === TOGGLE_MODAL) {
		sendEvent({
			name: "toggle-model",
			id: action.id,
		});
	}

	if (action.type === SELECT_SORT_OPTION) {
		sendEvent({
			name: "select-sort",
			id: action.selected,
		});
	}

	if (action.type === PERFORM_SEARCH) {
		sendEvent({
			name: "perform-search",
			id: action.query,
		});
	}

	return next(action);
};

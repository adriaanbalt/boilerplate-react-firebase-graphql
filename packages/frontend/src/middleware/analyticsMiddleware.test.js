import configureMockStore from "redux-mock-store";
import analyticsMiddleware from "./analyticsMiddleware";
import analytics from "lib/analytics";

import { TOGGLE_FAVORITE } from "actions";

// create a mock store that uses analyticsMiddleware and has some mock data
const mockStore = configureMockStore([analyticsMiddleware]);
const store = mockStore({});

// mock analytics.track so we can test against its arguments
jest.mock("../lib/analytics", () => ({
	track: jest.fn(),
}));

// check to see if the track call was in fact called when the TOGGLE_FAVORITE was called
test("Analytics Can I trigger an action (in this case TOGGLE_FAVORITE) that calls an analytics API request?", () => {
	store.dispatch({ type: TOGGLE_FAVORITE, id: "001" });
	expect(analytics.track).toHaveBeenCalledTimes(1);
});

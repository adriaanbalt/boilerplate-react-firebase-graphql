import SearchSetup from "../components/shared/Search/setup";
import firebase from "firebase/app";
import "firebase/storage";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SELECT_SORT_OPTION = "SELECT_SORT_OPTION";
export const PERFORM_SEARCH = "PERFORM_SEARCH";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const TOGGLE_INVERT = "TOGGLE_INVERT";

export const toggleModal = (data) => (dispatch) => {
	dispatch({
		type: TOGGLE_MODAL,
		...data,
	});
};

export const toggleDrawer = (data) => (dispatch) => {
	dispatch({
		type: TOGGLE_DRAWER,
		...data,
	});
};

export const toggleInvert = (boolean) => (dispatch) => {
	dispatch({
		type: TOGGLE_INVERT,
		value: boolean,
	});
};

export const selectSortOption = (selected) => (dispatch) => {
	dispatch({
		type: SELECT_SORT_OPTION,
		selected,
	});
};

export const performSearch = (query) => async (dispatch) => {
	const results = await SearchSetup.performSearch(query);
	dispatch({
		type: PERFORM_SEARCH,
		query,
		results,
	});
};

export const uploadFile = (file, workId) => async (dispatch) => {
	const storageRef = firebase.storage().ref();
	var metadata = { contentType: file.type };
	let fileRef = undefined;
	if (file.type === "image/jpeg" || file.type === "image/png") {
		fileRef = storageRef.child(`images/${workId}/${file.name}`);
	}
	const downloadURL = await fileRef
		.put(file, metadata)
		.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((downloadURL) => downloadURL);
	return downloadURL;

	// dispatch({
	//     type: UPLOAD_FILE,
	// })
};
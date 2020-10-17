import { createSelector } from "reselect";

const getPosts = state => state.PostsReducer.posts;

const selectPostFromParams = (state, props) => {
  // see comments in app/src/App.js for more information on why destructuring is happening here
  return props.location.pathname.split("/")[2];
};

export default createSelector(
  [getPosts, selectPostFromParams],
  (posts, id) => posts[id] // this is where the look up is O(1) (if posts is an array then this would need to be a filter() or loop over the data set) (one could argue that this is a stupid preformance boost but I'm trying to do micro optimizations)
);

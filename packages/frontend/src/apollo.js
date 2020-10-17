import ApolloClient from "apollo-boost";
import GRAPHQL from "./constants/graphql";
export default new ApolloClient({
  uri: GRAPHQL
});

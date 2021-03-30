export const GRAPHQL_URL =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-boiler-react-firebase-graphql.cloudfunctions.net/api"
    : "http://localhost:5000/boiler-react-firebase-graphql/us-central1/api";

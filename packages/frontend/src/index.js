import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { Provider } from "react-redux";
import store, { history } from "./Store";
import { ConnectedRouter } from "react-router-redux";
import App from "./App";
import registerServiceWorker from "./lib/serviceWorker";
import "./index.scss";
import { GRAPHQL_URL } from "./constants/graphql";
import StripeConfig from "./constants/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const uploadLink = createUploadLink({
	uri: GRAPHQL_URL, // Apollo Server is served from port 4000
	headers: {
		"keep-alive": "true",
	},
});
const apolloCache = new InMemoryCache();

const client = new ApolloClient({
	cache: apolloCache,
	link: uploadLink,
	uri: GRAPHQL_URL,
});

const stripePromise = loadStripe(StripeConfig.apiKey);

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Elements stripe={stripePromise}>
					<App />
				</Elements>
			</ConnectedRouter>
		</Provider>
	</ApolloProvider>,
	document.getElementById("root"),
);
registerServiceWorker();

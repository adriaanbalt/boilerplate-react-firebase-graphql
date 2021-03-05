import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { UseWalletProvider } from "use-wallet";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import bugsnag from "@bugsnag/expo";
import registerServiceWorker from "./lib/serviceWorker";
import { GRAPHQL_URL } from "./constants/graphql";
import StripeConfig from "./constants/stripe";
import { CollectionsProvider } from "./contexts/CollectionsContext";
import Navigator from "./navigator";
import "./index.scss";

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
const bugsnagClient = bugsnag();
const ErrorBoundary = bugsnagClient.getPlugin("react");

// used by the web implementation only (should gate around this)
registerServiceWorker();

const Main = () => {
	return (
		<ApolloProvider client={client}>
			<UseWalletProvider chainId={1}>
				<Elements stripe={stripePromise}>
					<CollectionsProvider>
						<App />
					</CollectionsProvider>
				</Elements>
			</UseWalletProvider>
		</ApolloProvider>
	);
};

const ErrorFallback = (props) => {
	return <View>Error Fallback!</View>;
};
export default class AppContainer extends React.Component {
	render() {
		return (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Main />
			</ErrorBoundary>
		);
	}
}

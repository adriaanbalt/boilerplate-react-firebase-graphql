import React from "react";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";
import { UseWalletProvider } from "use-wallet";
import { createUploadLink } from "apollo-upload-client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import bugsnag from "@bugsnag/expo";
import registerServiceWorker from "./lib/serviceWorker";
import { GRAPHQL_URL } from "./constants/graphql";
import StripeConfig from "./constants/stripe";
import { ProductsProvider } from "./contexts/ProductsContext";
import "./index.scss";
import App from "App";

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
// const bugsnagClient = bugsnag();
// const ErrorBoundary = bugsnagClient.getPlugin("react");

// used by the web implementation only (should gate around this)
registerServiceWorker();

const Main = () => {
	return (
		<ApolloProvider client={client}>
			<UseWalletProvider chainId={1}>
				<Elements stripe={stripePromise}>
					<ProductsProvider>
						<App />
					</ProductsProvider>
				</Elements>
			</UseWalletProvider>
		</ApolloProvider>
	);
};

const ErrorFallback = (props) => {
	// bugsnagClient.notify(new Error("Error Boundary Fallback"));
	// const [countdown, setCountdown] = useState(0);
	// const [timeToReload, setTimeToReload] = useState(10);
	// setInterval(() => {
	// 	setCountdown(countdown++);
	// }, 1000);
	// setTimeout(() => {
	// 	console.log('refresh!')
	// }, timeToReload * 1000);
	return <div>App Error!</div>;
};
export default class AppContainer extends React.Component {
	render() {
		return <Main />;
		// return (
		// 	<ErrorBoundary FallbackComponent={ErrorFallback}>
		// 		<Main />
		// 	</ErrorBoundary>
		// );
	}
}

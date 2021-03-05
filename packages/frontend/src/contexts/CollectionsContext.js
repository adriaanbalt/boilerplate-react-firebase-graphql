import React, { useContext } from "react";
import PropTypes from "prop-types";

const CollectionsContext = React.createContext();

class CollectionsProvider extends React.Component {
	static propTypes = {
		children: PropTypes.node,
	};

	state = {
		collections: {}, // hashmap of the user's collections
	};

	addCollection = (nft) => {
		this.setState({
			Collections: storedList.add(nft),
		});
	};

	removeCollection = (index) => {
		this.setState({
			Collections: storedList.remove(index),
		});
	};

	render() {
		const { children } = this.props;
		const { Collections } = this.state;
		return (
			<CollectionsContext.Provider
				value={{
					Collections,
					addCollection: this.addCollection,
					removeCollection: this.removeCollection,
				}}>
				{children}
			</CollectionsContext.Provider>
		);
	}
}

function useCollections() {
	return useContext(CollectionsContext);
}

const CollectionsConsumer = CollectionsContext.Consumer;

export { CollectionsProvider, CollectionsConsumer, useCollections };

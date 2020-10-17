import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import classnames from "classnames";
import { IoIosMenu } from "react-icons/io";
import withScreen from "hoc/withScreen";

import { selectSortOption, toggleDrawer } from "actions";

import styles from "./styles.module.scss";
import MyHoldings from "./Lists/MyHoldings";

/**
 * @class ViewCollection
 * @extends {Component}
 */
class ViewCollection extends Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
		};
	}

	toggleDrawer = () => {
		this.props.toggleDrawer();
	};

	render() {
		return (
			<section className={styles.ViewCollection}>
				<div className='inner-wrapper'>
					<div
						className={styles.drawerToggler}
						onClick={this.toggleDrawer}>
						<IoIosMenu size={20} color={"#fff"} />
					</div>
					<div
						className={classnames(
							styles.content,
						)}>
						{this.props.match.params.filterBy ===
							"my-holdings" && (
								<MyHoldings user={this.props.user} />
							)}
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	sort: state.SortReducer,
	searchResults: state.SearchReducer.results,
	isDrawerOpen: state.UIReducer.drawer,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			selectSortOption,
			toggleDrawer,
		},
		dispatch,
	);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	(component) => withScreen(component, "from-left"), // this technique allows for custom transitions between screens
)(ViewCollection);

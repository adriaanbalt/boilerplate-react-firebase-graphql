import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";

import withScreen from "hoc/withScreen";

import { UPDATE_USER } from "graphql/requests";

import styles from "./styles.module.scss";
import Login from "components/shared/Login";

/**
 * @class ViewHome
 * @extends {Component}
 */
class ViewHome extends Component {
	state = {
		email: null,
		password: null,
	};

	render() {
		return (
			<section className={styles.ViewHome}>
				<div className='inner-wrapper'>
					<div className={styles.content}>
						<div>
							<h4>Welcome to the React, Firebase, GraphQL boilerplate.</h4>
							{
								!this.props.user
								&&
								<Login
									history={this.props.history}
									createUserWithEmailAndPassword={this.props.createUserWithEmailAndPassword}
									signInWithEmailAndPassword={this.props.signInWithEmailAndPassword} />
							}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(UPDATE_USER, {
		name: "mutationUpdateUser",
	}),
	(component) => withScreen(component, "from-left"), // this technique allows for custom transitions between screens
)(ViewHome);

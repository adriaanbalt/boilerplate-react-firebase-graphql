import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";

import withScreen from "hoc/withScreen";

import { UPDATE_USER } from "graphql/requests";

import styles from "./styles.module.scss";
import Button from "components/shared/Button";

/**
 * @class ViewProfile
 * @extends {Component}
 */
class ViewProfile extends Component {
	state = {
		email: null,
		password: null,
	};

	handleChangeEmail = (e) => {
		this.setState({
			email: e.target.value,
		});
	};

	handleChangePassword = (e) => {
		this.setState({
			password: e.target.value,
		});
	};

	handleLogout = () => {
		this.props.signOut()
	};

	render() {
		return (
			<section className={styles.ViewProfile}>
				<div className='inner-wrapper'>
					<h1>Account Settings</h1>
					{
						this.props.user
						&&
						this.props.user.email
						&&
						<p>Email: {this.props.user.email}</p>
					}
					{
						this.props.user
						&&
						this.props.user.uid
						&&
						<p>id: {this.props.user.uid}</p>
					}
					<Button className={styles.logoutBtn} onClick={this.handleLogout}>Logout</Button>
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
)(ViewProfile);

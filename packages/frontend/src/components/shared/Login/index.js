import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";

import withScreen from "hoc/withScreen";

import { UPDATE_USER } from "graphql/requests";

import styles from "./styles.module.scss";

/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
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

	handleLogin = async () => {
		if (this.validate()) {
			// user firebase to login
			const res = await this.props.signInWithEmailAndPassword(
				this.state.email,
				this.state.password,
			);
			if (res) {
				// redirect because we have a valid user
				this.props.history.push("/");
			} else {
				console.error("oops error");
			}
		}
	};

	handleSignup = async () => {
		if (this.validate()) {
			// const newUser = await this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
			const result = await this.props.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password,
			);

			//TODO ths is broken

			// if there is no result that means there is an error, which is automatically added to props by App.js witheFiebaseAuth HOC
			if (!result) return;

			// need to updated database with custom user information
			this.props
				.mutationUpdateUser({
					variables: {
						userId: result.user.uid,
						name: this.state.name,
					},
				})
				.then((res) => {
					console.log("res", res);
				});

			// redirect because we have a valid user
			this.props.history.push("/");
		}
	};

	validate = () => {
		return this.state.email && this.state.password;
	};

	handleChange(event, property) {
		this.setState({
			...this.state.workProperties,
			[property]: event.target.value,
		});
	}

	render() {
		const { error } = this.props;
		return (
			<section className={styles.Login}>
				<div className='inner'>
					<h4>Login</h4>
					<label>
						Email
							<input
							name='email'
							type='email'
							placeholder='Email'
							onChange={(e) => this.handleChange(e, "email")}
						/>
					</label>
					<label>
						Password
							<input
							name='password'
							type='password'
							placeholder='Password'
							onChange={(e) =>
								this.handleChange(e, "password")
							}
						/>
					</label>
					<button type='submit' onClick={this.handleLogin}>
						Log in
						</button>
					<hr />
					<br />
					<h4>Signup</h4>
					<label>
						Name
							<input
							name='name'
							type='name'
							placeholder='Name'
							onChange={(e) => this.handleChange(e, "name")}
						/>
					</label>
					<label>
						Email
							<input
							name='email'
							type='email'
							placeholder='Email'
							onChange={(e) => this.handleChange(e, "email")}
						/>
					</label>
					<label>
						Password
							<input
							name='password'
							type='password'
							placeholder='Password'
							onChange={(e) =>
								this.handleChange(e, "password")
							}
						/>
					</label>
					<button type='submit' onClick={this.handleSignup}>
						Sign up
						</button>
					{error && <div>{error}</div>}
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
)(Login);

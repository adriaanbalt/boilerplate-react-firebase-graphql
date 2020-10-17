import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";
import { ADD_PRODUCT } from "graphql/requests";
import { uploadFile, toggleInvert } from "../../../actions"

import styles from "./styles.module.scss";
import StepByStep from "components/shared/StepByStep";
import Complete from "./Complete";
import Input from "./Input";
import Review from "./Review";

/**
 * @class Register
 * @extends {Component}
 */
class Register extends Component {
	constructor() {
		super();
		this.state = {
			properties: {},
			loading: false,
			success: null,
			steps: [
				{
					component: <Input />,
					backLabel: "Back",
					nextLabel: "Next",
				},
				{
					component: Review,
					backLabel: "Back",
					nextLabel: "Next",
				},
				{
					component: <Complete />,
					nextLabel: "Finish",
				}
			]
		};
	}

	componentDidMount = () => {
		this.props.toggleInvert(true);
	}

	componentWillUnmount = () => {
		this.props.toggleInvert(false);
	}

	validate = () => {
		// const ret =
		// 	!!this.state.nextUserId && !!this.state.properties.salePrice;
		// return ret;
	};

	handleSubmit = async () => {
		console.log("REGISTER REVIEW HANDLESUBMIT")
		const valid = this.validate()
		if (!valid) {
			return valid;
		}
		const titleId = this.state.workProperties.title.replace(
			/[^A-Z0-9]+/gi,
			"_",
		);
		// upload the image to Google Firebase Storage within the action
		const imagePath = await this.props.uploadFile(this.state.file, titleId);
		// create a new database object for the WORK
		const response = await this.props
			.mutationaddProduct({
				variables: {
					...this.state.workProperties,
					url: imagePath,
					creatorEmail: this.props.user.email,
					ownerId: this.props.user.uid, // at this moment the person who uploaded the art also owns it (?)
					creatorId: this.props.user.uid,
					isOutgoing: false,
					// isIncoming: false, // i dont think we need this
				},
			})
			.then((response) => {
				return !!response.data.response;
			})
			.catch((err) => {
				console.log(err);
			});
		this.setState({
			loading: false,
		});
		return true
		// if (response.data.RegisterWork.response) {
		// 	return {
		// 		success: response.data.RegisterWork.response,
		// 	}
		// } else {
		// 	// there was an error
		// 	return response
		// }
	}

	handleUser = (event, property) => {
		this.setState({
			...this.state,
			[property]: event.target.value,
		});
	}

	handleProperty = (event, property) => {
		this.setState({
			properties: {
				...this.state.properties,
				[property]: Number(event.target.value),
			},
		});
	}

	uploadFile({
		target: {
			validity,
			files: [file],
		},
	}) {
		if (validity.valid) {
			this.setState({
				file: file,
			});
		} else {
			// show some error
			console.log("error");
		}
	}

	handleBack = () => {
		this.props.handleBack();
	}

	render() {
		const {
			steps
		} = this.state
		return (
			<div className={styles.Register}>
				<StepByStep
					steps={steps}
					handleSubmit={this.handleSubmit}
					handleBack={this.handleBack} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	uploadFile,
	toggleInvert
}, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(ADD_PRODUCT, {
		name: "mutationaddProduct",
	}),
)(Register);

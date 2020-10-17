import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { ADD_PRODUCT } from "graphql/requests";
import withScreen from "hoc/withScreen";
import styles from "./styles.module.scss";
import { uploadFile, toggleModal } from "actions";
import Loading from "components/shared/Loading";
import Register from "components/shared/Register";

/**
 * @class ViewCreate
 * @extends {Component}
 */
class ViewCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workProperties: {},
			file: null,
			uploadSuccess: null,
			loading: false,
		};
	}

	handleChange(event, property) {
		this.setState({
			workProperties: {
				...this.state.workProperties,
				[property]: event.target.value,
			},
		});
	}

	validate() {
		return !!this.state.workProperties.title && this.state.file;
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (!this.validate()) {
			// if we dont validate dont add work
			return;
		}
		this.setState({
			loading: true,
		});

		const titleId = this.state.workProperties.title.replace(
			/[^A-Z0-9]+/gi,
			"_",
		);

		// upload the image to Google Firebase Storage within the action
		const imagePath = await this.props.uploadFile(this.state.file, titleId);

		// create a new database object for the WORK
		await this.props
			.mutationaddProduct({
				variables: {
					...this.state.workProperties,
					url: imagePath,
					creatorEmail: this.props.user.email,
					ownerId: this.props.user.uid, // at this moment the person who uploaded the art also owns it (?)
					creatorId: this.props.user.uid,
					uploaderId: this.props.user.uid, // this could be a dealer
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

		this.props.toggleModal({
			children: (
				<div>
					<p>{`Upload of ${this.state.workProperties.title} was successful`}</p>
					<Link
						to='/collection'
						onClick={() => this.props.toggleModal({})}>
						Click here to see your collection
					</Link>
				</div>
			),
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

	render() {
		const { loading } = this.state;
		return (
			<React.Fragment>
			{
				loading
				&&
				<Loading/>
			}
			{
				!loading
				&&
				<section className={styles.ViewCreate}>
					<div className='inner-wrapper'>
						<Register
							handleBack={this.handleBack}
						/>
					</div>
				</section>
			}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			uploadFile,
			toggleModal,
		},
		dispatch,
	);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(ADD_PRODUCT, {
		name: "mutationaddProduct",
	}),
	(component) => withScreen(component, "from-left"), // this technique allows for custom transitions between screens
)(ViewCreate);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import styles from "./styles.module.scss";
import StepIdentifier from "components/shared/StepByStep/StepIdentifier";
import Button from "../Button";

/**
 * @class StepByStep
 * @extends {Component}
 */
class StepByStep extends Component {
	constructor() {
		super();
		this.state = {
			currentIndex: 0,
			success: null,
			loading: false,
			error: null,
		};
	}

	handleSubmit = async () => {

		this.setState({
			loading: true,
		})
		// run loader
		const res = await this.props.handleSubmit()
		// remove loader
		if (res) {
			// if there wasnt an error
			this.next()
		} else {
			this.setState({
				loading: false,
			})
			// display error msgs
		}

	}

	next = (validator) => {
		console.log("StepByStep next")
		// const validation = validator()
		// if ( !validation.status ) {
		// 	return validation.error;
		// }

		let {
			currentIndex
		} = this.state
		const newIndex = currentIndex + 1
		if (newIndex < this.props.steps.length) {
			this.setState({
				currentIndex: newIndex
			})
		}
	}

	previous = () => {
		let {
			currentIndex
		} = this.state
		if (currentIndex === 0) {
			this.props.handleBack()
			return
		}
		const newIndex = currentIndex - 1
		if (newIndex >= 0) {
			this.setState({
				currentIndex: newIndex
			})
		}
	}

	onChangeUser = (e, property) => {
		if (e.key === 'Enter') {
			this.next()
		} else {
			this.props.handleUser(e, property)
		}
	}
	onChangeProperty = (e, property) => {
		if (e.key === 'Enter') {
			this.next()
		} else {
			this.props.handleProperty(e, property)
		}
	}

	render() {
		const {
			currentIndex,
		} = this.state;
		const {
			steps,
		} = this.props
		return (
			<div className={styles.Sell}>
				<div className={styles.breadcrumbs}>
					{steps.map((step, index) =>
						<StepIdentifier
							key={`StepByStep-StepIdentifier-${index}`}
							isActive={index === currentIndex}
							isComplete={index < currentIndex}>
							<h4>{index + 1}</h4>
						</StepIdentifier>
					)}
				</div>
				<div className={styles.steps}>
					{steps
						.filter((step, index) => index === currentIndex)
						.map((step, index) => {
							if (typeof step.component === 'object') {
								return (
									<div key={`StepByStep-${index}`}>
										{step.component}
										<div className={styles.buttons}>
											{
												currentIndex < steps.length - 1
												&&
												<Button className={styles.buttons} onClick={this.previous}>{step.backLabel}</Button>
											}
											<Button onClick={this.next}>{step.nextLabel}</Button>
										</div>
									</div>
								)
							}
							return (
								React.createElement(step.component, {
									key: `StepByStep-${index}`,
									next: this.handleSubmit,
									previous: this.previous,
								})
							)
						})
					}
				</div>
				{this.state.error && <div>{this.state.error}</div>}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(StepByStep);

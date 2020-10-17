import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";
import cx from "classnames";
import { GET_WORK_BY_WORKID_USERID } from "graphql/requests";

import withScreen from "hoc/withScreen";
import styles from "./styles.module.scss";
import Loading from "components/shared/Loading";
import Button from "components/shared/Button";

/**
 * @class ViewDetails
 * @extends {Component}
 */
class ViewDetails extends Component {

	toggleModalDelete = () => {
		this.props.toggleModal({
			children: (
				<React.Fragment>
					{`Are you sure you want to delete ${this.props.title}?`}
					<Button
						onClick={() => {
							console.log("this doesnt work");
						}}>
						Yes
					</Button>
					<Button>No</Button>
				</React.Fragment>
			),
		});
	};

	render() {
		const {
			data: { loading },
		} = this.props;


		if (loading) {
			return (
				<Loading className={styles.loading} />
			);
		}

		const {
			data: {
				getWorkByWorkIdUserId: {
					title,
					url,
					transactions,
					owner,
					creator,
					offerOwner,
				},
			},
		} = this.props;
		const recentTransaction = transactions && transactions[0]
		const isOwner = owner.id === this.props.user.uid;
		const isOwnerWithOffer = isOwner && offerOwner
		const isOwnerNoOffer = isOwner && !offerOwner
		const isPurchaser = !isOwnerWithOffer && recentTransaction && (recentTransaction.status === "outgoing")
		return (
			<section className={styles.ViewDetails}>
				<div className='inner-wrapper'>
					<section className={styles.topArea}>
						<div className={cx(styles.copyContainer, styles.column)}>
							<h1>{creator.displayName}</h1>
							<h2>{title}</h2>
							<div className={styles.buttons}>
								{isOwnerNoOffer && (
									<Button to={`${this.props.match.params.id}/sell`}>
										Create Sales Offer
									</Button>
								)}
								{isOwnerWithOffer && (
									<Button to={`${this.props.match.params.id}/complete`}>
										Complete Transfer
									</Button>
								)}
								{isPurchaser && (
									<Button to={`${this.props.match.params.id}/accept`}>
										Accept offer
									</Button>
								)}
								{isPurchaser && (
									<Button to={`${this.props.match.params.id}/decline`}>
										Decline offer
									</Button>
								)}
							</div>
						</div>
						<div className={cx(styles.carousel, styles.column)}>
							<img src={url} alt={title} className={cx(styles.image)} />
						</div>
					</section>
					{
						isOwnerWithOffer
						&&
						<section>
							<h3>Transfer offer sent on {recentTransaction.createdDate}</h3>
							<h4>Status: awaiting buyer signature</h4>
							<h3>Buyer: {offerOwner.displayName}</h3>
						</section>
					}
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(GET_WORK_BY_WORKID_USERID, {
		options: (props) => {
			return {
				fetchPolicy: "cache-and-network",
				variables: {
					workId: props.match.params.id,
					userId: props.user.uid,
				},
			};
		},
	}),
	(component) => withScreen(component, "from-left"),
)(ViewDetails);

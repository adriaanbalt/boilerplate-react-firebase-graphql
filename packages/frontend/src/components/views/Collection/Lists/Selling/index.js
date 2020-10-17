import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import styles from "./styles.module.scss";
import { GET_WORK_BY_USERTYPE } from "graphql/requests";
import Loading from "components/shared/Loading";
import ListItem from "../../ListItem";
import TRANSACTION_STATUS from "enums/TRANSACTION_STATUS";

/**
 * @class Selling
 * @extends {Component}
 */
class Selling extends Component {
	render() {
		const {
			data: { loading },
		} = this.props;

		if (loading) {
			return (
				<Loading className={styles.loading} />
			);
		}
		const { data } = this.props;
		return (
			<div className={classnames(styles.listContainer, styles.content)}>
				{data.GetIncomingOffers &&
					data.GetIncomingOffers.map((work, index) => (
						<ListItem
							key={`key-SellingItem-${index}-${work.id}`}
							{...work}
						/>
					))}
				{data.GetIncomingOffers && data.GetIncomingOffers.length === 0 && (
					<p>
						You have no art in your collection.{" "}
						<Link className={styles.NoWorksLink} to='/add'>
							Click here to add work you've created.
						</Link>
					</p>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(GET_WORK_BY_USERTYPE, {
		options: (props) => {
			return {
				fetchPolicy: "cache-and-network",
				variables: {
					userType: "previousUserId",
					status: TRANSACTION_STATUS.offer,
					userId: 0 || (props.user && props.user.uid),
				},
			};
		},
	}),
)(Selling);

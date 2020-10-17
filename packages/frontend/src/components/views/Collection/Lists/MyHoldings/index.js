import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { graphql } from "react-apollo";

import styles from "./styles.module.scss";
import { GET_COLLECTION } from "graphql/requests";
import Loading from "components/shared/Loading";
import Grid from "components/shared/Grid";

/**
 * @class MyCollection
 * @extends {Component}
 */
class MyCollection extends Component {
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
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h1>Collection</h1>
                </div>
                <div className={styles.listContainer}>
                    {data.response &&
                        <Grid list={[...data.response]} />
                    }
                    {data.response && data.response.length === 0 && (
                        <p>
                            {`Please register a work of art.`}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(GET_COLLECTION, {
        options: (props) => {
            return {
                fetchPolicy: "cache-and-network",
                variables: {
                    userId: 0 || (props.user && props.user.uid),
                },
            };
        },
    }),
)(MyCollection);

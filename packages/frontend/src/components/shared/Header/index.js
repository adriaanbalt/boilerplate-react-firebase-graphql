import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import cx from "classnames";

import { GET_COLLECTION } from "graphql/requests";
import Logo from "components/shared/graphics/Logo";
import styles from "./styles.module.scss";

/**
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
    isActive = (path) => {
        return this.props.location.pathname.includes(path) ? cx(styles.isActive) : null
    }
    isInverted = (path) => {
        return this.props.location.pathname.includes(path) ? cx(styles.isInverted) : null
    }
    render() {
        const {
            user,
        } = this.props;

        let collectionCount = '';

        if (
            this.props.GET_COLLECTION.response
        ) {
            collectionCount = `(${this.props.GET_COLLECTION.response.length})`;
        }

        return (
            <header className={cx(styles.header)}>
                <div className={cx(styles.inner)}>
                    <Link to={"/"} className={`logo ${cx(styles.logoLink)}`}><Logo color="#000" /></Link>
                    {user && (
                        <nav className={styles.navContainer}>
                            <div className={styles.mainNavButtonsContainer}>
                                <div className={styles.mainNavButtonsContainerInner}>
                                    <Link to={"/collection"} className={this.isActive('collection') || this.isInverted('sell')}>{`Collection ${collectionCount}`}</Link>
                                    <Link to={"/profile"} className={this.isActive('profile')}>Profile</Link>
                                    <Link to={"/create"} className={this.isActive('create')}>Create</Link>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(GET_COLLECTION, {
        name: 'GET_COLLECTION',
        options: (props) => {
            return {
                fetchPolicy: "cache-and-network",
                variables: {
                    userId: props.user && props.user.uid,
                },
            };
        },
    }),
)(Header);

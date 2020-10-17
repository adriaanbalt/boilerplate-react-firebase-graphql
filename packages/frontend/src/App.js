import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./constants/firebaseConfig";

import { toggleModal } from "./actions";
import styles from "./App.module.scss";

import ViewHome from "components/views/Home";
import ViewCollection from "components/views/Collection";
import ViewDetails from "components/views/Details";
import Login from "components/shared/Login";
import ViewCreate from "components/views/Create";
import ViewProfile from "components/views/Profile";

import Header from "components/shared/Header";
import Loading from "components/shared/Loading";
import Modal from "components/shared/Modal";
import Footer from "components/shared/Footer";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const TIMEOUT = 600;
const TRANSITION_CLASS = "route-transition";

const ScreenTransition = ({
    animationKey,
    children,
    noTimeout,
    appear = false /* should the transition play when the screen is initially mounted (i.e. the app's initial screen)? */,
}) => {
    return (
        <TransitionGroup>
            <CSSTransition
                key={animationKey}
                timeout={noTimeout ? 0 : TIMEOUT}
                classNames={TRANSITION_CLASS}
                appear={appear}>
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

const PrivateRoute = ({ children, user, location }) => {
    if (user) {
        return children;
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: { from: location },
                }}
            />
        );
    }
};

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
    render() {
        const { location } = this.props;
        return (
            <div>
                <Modal
                    {...this.props.modal}
                    closeModal={() => this.props.toggleModal({})}
                />
                {this.props.user !== undefined &&
                    <Header {...this.props} />
                }
                <div className={styles.ScreenContainer}>
                    {this.props.user === undefined && ( // this means the user data is still being loaded
                        <Loading className={styles.loading} />
                    )}
                    {this.props.user !== undefined && ( // the user could be null, in which case then we redirect to the login/signup page
                        <React.Fragment>
                            <Switch location={location}>
                                <Route
                                    exact
                                    path={`/login`}
                                    render={() => (
                                        <ScreenTransition
                                            animationKey={location.key}>
                                            <Login {...this.props} />
                                        </ScreenTransition>
                                    )}
                                />
                                <Route
                                    exact
                                    path={`/`}
                                    render={() => (
                                        <ScreenTransition
                                            animationKey={location.key}>
                                            <ViewHome {...this.props} />
                                        </ScreenTransition>
                                    )}
                                />
                                <Route
                                    exact
                                    path={`/collection/:filterBy`}
                                    render={
                                        (props) => {
                                            const mergedProps = {
                                                ...this.props,
                                                ...props,
                                            };
                                            return (
                                                <PrivateRoute {...this.props}>
                                                    <ScreenTransition
                                                        animationKey={
                                                            location.key
                                                        }>
                                                        <ViewCollection
                                                            {...mergedProps}
                                                        />
                                                    </ScreenTransition>
                                                </PrivateRoute>
                                            );
                                        }
                                    }
                                />
                                <Route
                                    exact
                                    path={`/create`}
                                    render={() => (
                                        <PrivateRoute {...this.props}>
                                            <ScreenTransition
                                                animationKey={location.key}>
                                                <ViewCreate {...this.props} />
                                            </ScreenTransition>
                                        </PrivateRoute>
                                    )}
                                />
                                <Route
                                    exact
                                    path={`/details/:id`}
                                    render={
                                        (props) => {
                                            const mergedProps = {
                                                ...this.props,
                                                ...props,
                                            };
                                            return (
                                                <PrivateRoute {...this.props}>
                                                    <ScreenTransition
                                                        animationKey={
                                                            location.key
                                                        }>
                                                        <ViewDetails
                                                            {...mergedProps}
                                                        />
                                                    </ScreenTransition>
                                                </PrivateRoute>
                                            );
                                        }
                                    }
                                />
                                <Route
                                    exact
                                    path={`/profile`}
                                    render={
                                        (props) => {
                                            const mergedProps = {
                                                ...this.props,
                                                ...props,
                                            };
                                            return (
                                                <PrivateRoute {...this.props}>
                                                    <ScreenTransition
                                                        animationKey={
                                                            location.key
                                                        }>
                                                        <ViewProfile
                                                            {...mergedProps}
                                                        />
                                                    </ScreenTransition>
                                                </PrivateRoute>
                                            );
                                        }
                                    }
                                />
                            </Switch>
                        </React.Fragment>
                    )}
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    modal: state.UIReducer.modal,
    invert: state.UIReducer.invert,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            toggleModal,
        },
        dispatch,
    );

export default compose(
    withRouter, // https://stackoverflow.com/questions/46485056/withrouter-connect-and-react-compose
    // withRouter needs to come first in order for history state to work properly https://github.com/supasate/connected-react-router/issues/130#issuecomment-428221018
    withFirebaseAuth({
        firebaseAppAuth,
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(App);

import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Animated, Image, TextBase } from "react-native";
import Dispatchers from "../../redux/dispatchers";
import Variables from "../../constants/Variables";
import { getUserListByListName, getUserStateByUserId } from "../../redux/selectors";
import LIST_TYPES from "../../enums/LIST_TYPES";
import { Ionicons } from "@expo/vector-icons";

class ProfileNavButton extends React.Component {

    styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            width: Variables.ProfileNavBtnDiameter,
            height: Variables.ProfileNavBtnDiameter,
            marginTop: 10,
        },
        imageContainer: {
            width: Variables.ProfileNavBtnDiameter,
            height: Variables.ProfileNavBtnDiameter,
            borderRadius: Variables.ProfileNavBtnDiameter / 2,
            overflow: "hidden",
            backgroundColor: Variables.backgroundColor,
            alignItems: "center",
            justifyContent: "center"
        },
        circleBG: {
            position: "absolute",
            width: Variables.ProfileNavBtnDiameter + 2,
            height: Variables.ProfileNavBtnDiameter + 2,
            borderRadius: Variables.ProfileNavBtnDiameter + 2 / 2,
            zIndex: -1,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: Variables.shadowColor,
            shadowOpacity: Variables.shadowOpacity,
            shadowRadius: Variables.shadowRadius,
        },
        counterContainer: {
            position: "absolute",
            top: -5,
            right: 5,
            zIndex: 1,
        },
        counterTextCircle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 2,
            width: Variables.NavCounterDiameter + 15, // 6 if 3#s, 
            height: Variables.NavCounterDiameter,
            borderRadius: Variables.NavCounterDiameter / 2,
            backgroundColor: Variables.popColor,
        },
        counterText: {
            fontSize: 10,
        },
        counterFlash: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: Variables.NavCounterDiameter,
            height: Variables.NavCounterDiameter,
            borderRadius: Variables.NavCounterDiameter / 2,
            backgroundColor: Variables.backgroundColor,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: Variables.fontColor,
            shadowOpacity: Variables.shadowOpacity,
            shadowRadius: Variables.shadowRadius,
        },
    });

    state = {
        user: null,
        watchItr: null,
    }

    constructor(props) {
        super(props);
        this.animation = new Animated.Value(0);
        this._counterOpacityAnimation = new Animated.Value(1);
    }

    componentDidMount = () => {
        this.counterAnimation()
    }
    componentDidUpdate = () => {
        this.counterAnimation()
    }

    shouldComponentUpdate = (nextProps) => {
        return this.props.user !== nextProps.user
    }

    counterAnimation = () => {
        Animated.sequence([
            Animated.timing(this._counterOpacityAnimation, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.animation, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.animation, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
            // Animated.delay(1000),
            // Animated.timing(this._counterOpacityAnimation, {
            // 	toValue: 0,
            // 	duration: 500
            // })
        ]).start(); // start the sequence group
    };

    render() {
        // set default values
        let watchlistSize = 0
        const { user, watchItr } = this.props;

        if (watchItr) {
            watchlistSize = watchItr.size();
        }

        return (
            <View style={this.styles.container}>
                <Animated.View
                    style={[
                        this.styles.counterContainer,
                        { opacity: this._counterOpacityAnimation },
                    ]}>
                    <View style={[
                        this.styles.counterTextCircle,
                        {
                            width: watchlistSize > 1000 ? Variables.NavCounterDiameter + 15 : watchlistSize > 100 ? Variables.NavCounterDiameter + 6 : Variables.NavCounterDiameter,
                        }
                    ]}>
                        <Text style={this.styles.counterText}>{watchlistSize}</Text>
                    </View>
                    <Animated.View
                        style={[
                            this.styles.itemOverlay,
                            { opacity: this.animation },
                        ]}>
                        <View style={this.styles.counterFlash} />
                    </Animated.View>
                </Animated.View>
                {
                    (user && user.photo_url)
                    &&
                    <Image
                        style={this.styles.imageContainer}
                        source={{ uri: user.photo_url }}
                    />
                }
                {
                    (!(user && user.photo_url) || !user)
                    &&
                    <View style={this.styles.imageContainer}>
                        <Ionicons
                            name={"md-person"}
                            size={15}
                            color={this.props.tintColor}
                        />
                    </View>
                }
                <View
                    style={{
                        backgroundColor: this.props.tintColor,
                        ...this.styles.circleBG,
                    }}></View>
            </View>
        );
    }
}

export default connect((state, props) => {
    if (state.user) {
        // this specific component is mounted via the AppNavigator which happens separately from the Dispatcher.initialLoad()
        // therefore we only want to connect the right data when that data is available.
        return {
            user: getUserStateByUserId(state, state.user.uid),
            watchItr: getUserListByListName(state, state.user.uid, LIST_TYPES.watch),
        }
    } else {
        return {}
    }
}, Dispatchers)(ProfileNavButton);
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import classnames from "classnames";
import Screen from "./Screen";

const withScreen = (PassedComponent, classname) =>
  class withScreenWrapper extends React.Component {
    render() {
      // https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component
      const { ...passedProps } = this.props;
      return (
        <Screen
          className={classnames({
            screen: true,
            [classname]: true
          })}
        >
          <PassedComponent {...passedProps} />
        </Screen>
      );
    }
  };

export default compose(connect(null, null), withScreen);

import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import IS_MOBILE from "../../lib/is-mobile";

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      isMounted: false,
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
    if (IS_MOBILE()) {
      let vh = window.innerHeight * 0.01;
      //this trick is useful to get 100% height of mobile screen (ignore the menu bar) see ref: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      this.wrapper.current.style.setProperty("--vh", ` ${vh}px `);
    }
  }

  componentWillUnmount = () => {
    this.setState({
      isMounted: false
    })
  }

  render() {
    const {
      isMounted
    } = this.state

    let className;
    if (isMounted) {
      className = classnames(this.props.className, styles.screen)
    } else {
      className = classnames(this.props.className, styles.screen, styles.floating)
    }
    return (
      <div
        className={className}
        ref={this.wrapper}
      >
        <div className={styles.inner}>{this.props.children}</div>
      </div>
    );
  }
}

export default Screen;

import React from "react";
import styles from "./styles.less";
import classnames from "classnames";
import { fromCDN } from "../../cdn-url";
import { connect } from "react-redux";
import { MdFileUpload } from "react-icons/io";
import { bindActionCreators } from "redux";
import { uploadImage } from "shared/CustomizeOptions/actions";

class ImageInput extends React.Component {
  state = {
    draggingOver: false
  };

  onImageUpload = e => {
    e.preventDefault();
    this.setState({ draggingOver: false });

    const [file] = e.target.files || e.dataTransfer.files;

    if (file && file.type.startsWith("image/")) {
      // this.props.uploadImage(URL.createObjectURL(file))
    }

    e.target.value = null; /* Reset the input so that the same file can be uploaded two times in a row, if the user resets in between */
  };

  triggerUpload = () => {
    this.input.click();
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragEnter = e => {
    e.preventDefault();
    this.setState({ draggingOver: true });
  };

  onDragLeave = () => {
    this.setState({ draggingOver: false });
  };

  render() {
    const { draggingOver } = this.state;
    const { className, currentImage, loading } = this.props;

    return (
      <div className={classnames(className, styles.ImageUpload)}>
        <div
          className={classnames(styles.previewArea, {
            [styles.draggingOver]: draggingOver,
            [styles.isLoading]: loading
          })}
          onDrop={this.onImageUpload}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
        >
          <div className={styles.cta} onClick={this.triggerUpload}>
            <MdFileUpload />
            {i18n("add_image")}
          </div>
          {!!currentImage && (
            <img className={styles.preview} src={currentImage} />
          )}
          <img
            className={styles.loadingSpinner}
            src={fromCDN("/assets/images/spinner.png")}
          />
          <input
            type="file"
            accept="image/*"
            onChange={this.onImageUpload}
            ref={el => (this.input = el)}
          />
        </div>
        {!!currentImage && (
          <div className={styles.editLinks}>
            <span onClick={this.triggerUpload}>{i18n("replace")}</span>
            <span onClick={this.props.deleteCustomImage}>{i18n("delete")}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      uploadImage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImageInput);

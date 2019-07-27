import React from "react";
import { Icon, Card, message, Button, Modal, Row, Col } from "antd";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import shareIcon from "../../data/images/share.png";
import { imageLikeRequest } from "./actions";
import { CopyToClipboard } from "react-copy-to-clipboard";

class LikeandShare extends React.Component {
  state = {
    creditModalVisible: false,
    clicked: false,
    value: "",
    copied: false
  };
  showCreditModal = () => {
    this.setState({
      creditModalVisible: true
    });
  };
  handleLike(imageId) {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      this.props.onClickImage(imageId, user.id);
      this.setState({
        clicked: !this.state.clicked
      });
    } else {
      message.info("Please login to like and share ");
    }
  }
  handleOk = () => {
    this.setState({ creditModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ creditModalVisible: false });
  };
  render() {
    const {
      likes,
      shares,
      imageId,
      newlikes,
      hearts,
      image,
      artistName,
      page
    } = this.props;
    const lik = newlikes && newlikes.likes;

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span onClick={() => this.handleLike(imageId)}>
          <Icon
            type="heart"
            theme={"filled"}
            style={{ fontSize: "16px", color: "#FA08FF" }}
          />{" "}
          Likes : {likes}
        </span>
        {page === "homepage" && (
          <span>
            <a href={image} style={{ color: "black" }} download target="_self">
              <Button
                style={{
                  color: "black",
                  background: "#CBF525"
                }}
                icon="download"
                size={"small"}
                onClick={this.showCreditModal}
              >
                Download
              </Button>
            </a>
          </span>
        )}

        <span style={{ float: "right" }}>
          <img
            src={shareIcon}
            alt="share icon"
            style={{ marginRight: "4px", marginBottom: "2px" }}
          />
          shares: {shares}
        </span>
        {/* Credit modal */}
        <Modal
          title=""
          visible={this.state.creditModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[null, null]}
        >
          <Row>
            <Col span={10}>
              <img
                src={image}
                className="creditImage"
                height="170px"
                width="98%"
                alt="some image"
              />
            </Col>
            <Col span={14}>
              <div className="creditDescription">
                <h2>Say Thanks</h2>
                <p>
                  Crediting isn’t required, but is appreciated and allows
                  photographers to gain exposure.Copy the text below.
                </p>
                <div>
                  <textarea
                    readonly
                    value={`Photo by ${artistName} on Weerdbox`}
                    onChange={({ target: { value } }) =>
                      this.setState({ value, copied: false })
                    }
                  />
                  <CopyToClipboard
                    text={`Photo by ${artistName} on Weerdbox`}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <Button
                      style={{
                        marginLeft: "5px",
                        position: "absolute",
                        marginTop: "0px",
                        paddingBottom: -"24rem",
                        display: "inline-block"
                      }}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>

                  {this.state.copied ? (
                    <span style={{ color: "red" }}>Copied.</span>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    newlikes: state.LikeandShare
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onClickImage: (imageId, userId) =>
      dispatch(imageLikeRequest(imageId, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeandShare);

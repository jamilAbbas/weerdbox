import React from "react";
import { Icon, Card, message, Button } from "antd";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import shareIcon from "../../data/images/share.png";
import { imageLikeRequest } from "./actions";

class LikeandShare extends React.Component {
  state = {
    clicked: false
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

  render() {
    const { likes, shares, imageId, newlikes, hearts, image } = this.props;
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
        <span>
          <Button
            style={{
              color: "black",
              background: "#CBF525"
            }}
            icon="download"
            size={"small"}
          >
            <a href={image} style={{ color: "black" }} download>
              Download
            </a>
          </Button>
        </span>
        <span style={{ float: "right" }}>
          <img
            src={shareIcon}
            alt="share icon"
            style={{ marginRight: "4px", marginBottom: "2px" }}
          />
          shares: {shares}
        </span>
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

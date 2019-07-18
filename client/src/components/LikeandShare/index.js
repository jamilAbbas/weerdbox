import React from "react";
import { Icon, Card, message } from "antd";
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
    const { likes, shares, imageId, newlikes, hearts } = this.props;
    console.log("imageId", imageId);
    const lik = newlikes && newlikes.likes;
    console.log("888888888888888", lik);
    return (
      <div>
        <Icon
          type="heart"
          onClick={() => this.handleLike(imageId)}
          style={{ fontSize: "16px", color: "#08c" }}
        />{" "}
        Likes : {likes}
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

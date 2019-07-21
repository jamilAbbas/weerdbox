import React from "react";
import { Card, Icon, Avatar, Row, Col, Modal, Button, Tag } from "antd";
import LikeandShare from "../LikeandShare";
import { connect } from "react-redux";
import shareIcon from "../../data/images/share.png";

import "./style.css";

class ImageItem extends React.Component {
  state = {
    loading: false,
    visible: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      name,
      email,
      likes,
      image,
      shares,
      imageId,
      tlikes,
      tags,
      website,
      description,
      contact
    } = this.props;
    const { visible, loading } = this.state;
    const updataLikes = tlikes && tlikes.likes;
    console.log("imageItemid", image);
    return (
      // <Col span={7}>
      <div className="imageCard">
        <Card
          hoverable
          style={{ width: 400 }}
          cover={
            <img
              alt="some image"
              src={image}
              style={{ height: "350px", width: "400px" }}
              onClick={this.showModal}
            />
          }
        >
          <LikeandShare
            likes={likes}
            imageId={imageId}
            shares={shares}
            hearts={updataLikes}
          />
        </Card>
        <Modal
          visible={visible}
          title={name}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <div className="content">
            <div className="imageHolder">
              <img
                src={image}
                alt="some image"
                width="60%"
                height="460px"
                style={{ width: "96%", borderRadius: "5px" }}
              />
              <div>
                <div className="likeContainer">
                  <span style={{ float: "left" }}>
                    <Icon
                      // onClick={() => this.handleLike(imageId)}
                      style={{ fontSize: "20px", color: "#08c" }}
                      type="heart"
                      theme="filled"
                    />{" "}
                    Likes : {likes}
                  </span>
                  <span style={{ width: "100%" }}>
                    <a href={image} downnload>
                      Download
                    </a>
                  </span>
                  <span style={{ float: "right", marginRight: "1rem" }}>
                    <img
                      src={shareIcon}
                      alt="share icon"
                      style={{ marginRight: "4px", marginBottom: "2px" }}
                    />
                    shares: {shares}
                  </span>
                </div>
              </div>
            </div>
            <div className="description">
              <p>
                <span style={{ fontWeight: "600", color: "black" }}>Name</span>:{" "}
                {name}
              </p>
              <p>
                <span style={{ fontWeight: "600", color: "black" }}>
                  Wesite
                </span>
                : {website}
              </p>
              <p>
                <span style={{ fontWeight: "600", color: "black" }}>
                  Description
                </span>
                : {description}
              </p>
              <p>
                <span style={{ fontWeight: "600", color: "black" }}>
                  Contact
                </span>
                : {contact}
              </p>
              <p>
                <h4 style={{ fontWeight: "600", color: "black" }}>Tags</h4>
                {tags && tags.map(t => <Tag color="geekblue">{t}</Tag>)}
              </p>
            </div>

            <div />
          </div>
        </Modal>
      </div>
      // </Col>
    );
  }
}
const mapStateToProps = state => {
  return {
    tlikes: state.LikeandShare
  };
};
export default connect(
  mapStateToProps,
  null
)(ImageItem);

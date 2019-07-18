import React from "react";
import { Card, Icon, Avatar, Row, Col, Modal, Button } from "antd";
import LikeandShare from "../LikeandShare";
import { connect } from "react-redux";
// import "./styles.css";

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
    const { name, email, likes, image, shares, imageId, tlikes } = this.props;
    const { visible, loading } = this.state;
    const updataLikes = tlikes && tlikes.likes;
    console.log("imageItemid", imageId);
    return (
    
      <Col span={8}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={
            <img
              alt="some image"
              src={image}
              style={{ height: "400px" }}
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
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <img src={image} alt="some image" width=" 100%" height="auto"/>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Col>
     
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

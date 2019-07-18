import React from "react";
import { Card, Icon, Avatar, Row, Col, Modal, Button } from "antd";
import shareIcon from "../../data/images/share.png";
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
    const { name, email, likes, image, shares } = this.props;
    const { visible, loading } = this.state;

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
          <Icon type="heart" style={{ fontSize: "16px", color: "#08c" }} />{" "}
          Likes : {likes}
          <span style={{ float: "right" }}>
            <img
              src={shareIcon}
              alt="share icon"
              style={{ marginRight: "4px", marginBottom: "2px" }}
            />
            shares: {shares}
          </span>
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
            </Button>,
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
export default ImageItem;

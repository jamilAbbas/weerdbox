import React from "react";
import {
  Card,
  Icon,
  Avatar,
  Row,
  Col,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Checkbox,
  AutoComplete,
  message
} from "antd";
import LikeandShare from "../LikeandShare";
import { connect } from "react-redux";
import shareIcon from "../../data/images/share.png";
import Uploader from "../../components/Uploader";
import { editArtRequest } from "../../containers/app/actions";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";

import "./style.css";

const { Search } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class ImageItem extends React.Component {
  state = {
    loading: false,
    visible: false,
    editModalVisibe: false,
    autoCompleteResult: [],
    imageId: this.props.imageId,
    name: this.props.name,
    art: this.props.image,
    imageName: this.props.imageName
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  showEditModal = () => {
    this.setState({
      editModalVisibe: true
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
  handleEditModalCancel = () => {
    this.setState({ editModalVisibe: false });
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  //Edit Name func
  onChangeName(e) {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.art = this.state.art;
        values.imageId = this.state.imageId;
        this.props.onEditArtRequest(values);

        this.setState({
          editModalVisibe: false
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
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
      contact,
      page,
      artistName,
      uCimageName
    } = this.props;
    const { visible, loading } = this.state;
    const updataLikes = tlikes && tlikes.likes;

    console.log("----upload car img ImageItem", uCimageName);
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
              style={{ height: "250px", width: "400px" }}
              onClick={this.showModal}
            />
          }
        >
          {page === "dashboard" && (
            <Button
              type="primary"
              style={{ float: "left", marginRight: "-4rem" }}
              icon="edit"
              size={"small"}
              onClick={this.showEditModal}
            >
              Edit
            </Button>
          )}

          <div className="socialShareContainer">
            <div style={{ margin: "5px" }}>
              {" "}
              <FacebookShareButton
                quote={"Checkout my art on Weerdbox"}
                url={image}
              >
                <Icon
                  type={"facebook"}
                  theme="filled"
                  style={{
                    fontSize: "25px",
                    color: "#3b5998"
                  }}
                />
              </FacebookShareButton>
            </div>
            <div style={{ margin: "5px" }}>
              <LinkedinShareButton
                quote={"Checkout my art on Weerdbox"}
                url={image}
              >
                <Icon
                  type={"linkedin"}
                  theme="filled"
                  style={{ fontSize: "25px", color: "#0077B5" }}
                />
              </LinkedinShareButton>
            </div>

            <div style={{ margin: "5px" }}>
              <TwitterShareButton
                quote={"Checkout my art on Weerdbox"}
                url={image}
              >
                <Icon
                  type={"twitter"}
                  style={{ fontSize: "25px", color: "#38A1F3" }}
                />
              </TwitterShareButton>
            </div>
          </div>

          <LikeandShare
            likes={likes}
            imageId={imageId}
            shares={shares}
            hearts={updataLikes}
            image={image}
            artistName={name}
            imageName={uCimageName}
            page="homepage"
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
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              />
              <div>
                <div className="likeContainer">
                  <span style={{ float: "left" }}>
                    <Icon
                      // onClick={() => this.handleLike(imageId)}
                      style={{ fontSize: "20px", color: "#FA08FF" }}
                      type="heart"
                      theme="filled"
                    />{" "}
                    Likes : {likes}
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
                  Website
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
                  Contact Email
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

        {/* Edit modal */}

        <Modal
          visible={this.state.editModalVisibe}
          title="Edit Art"
          onOk={this.handleOk}
          onCancel={this.handleEditModalCancel}
          width={800}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <div className="uploadImageForm">
            <div style={{ display: "block", marginBottom: "20px" }}>
              <label htmlFor="file">Your Image:</label>{" "}
              <Uploader
                id="file"
                name="file"
                onChange={file => {
                  console.log("File changed: ", file);

                  if (file) {
                    file.progress(info =>
                      console.log("File progress: ", info.progress)
                    );
                    file.done(info => console.log("File uploaded: ", info));
                  }
                }}
                onUploadComplete={info => this.setState({ art: info.cdnUrl })}
              />
            </div>
            <img
              src={this.state.art ? this.state.art : image}
              height="400px"
              width="500px"
            />
          </div>
          <div className="uploadForm">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: "Please insert the name!"
                    }
                  ]
                })(<Input onChange={e => this.onChangeName(e)} />)}
              </Form.Item>
              <Form.Item label="Website">
                {getFieldDecorator("website", {
                  initialValue: website,
                  rules: [{ message: "Please input website!" }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input />
                  </AutoComplete>
                )}
              </Form.Item>
              <Form.Item label="Contact Email">
                {getFieldDecorator("contactEmail", {
                  rules: [
                    {
                      message: "Please input your contact email!"
                    }
                  ]
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator("description", {
                  initialValue: description,
                  rules: [
                    {
                      message: "Please enter the description of the image!"
                    }
                  ]
                })(<TextArea rows={4} style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Tags">
                {getFieldDecorator("tags", {
                  initialValue: tags,
                  rules: [
                    {
                      required: true,
                      message: "Please enter the Tags of the image!"
                    }
                  ]
                })(
                  <Input
                    // rows={1}
                    style={{ width: "100%" }}
                    placeholder="Enter comma seperated values e.g car,bike,bus"
                  />
                )}
              </Form.Item>
              <Form.Item label="Email you used to signup">
                {getFieldDecorator("email", {
                  initialValue: email,
                  rules: [
                    {
                      type: "email",
                      required: true,
                      message: "Email is Required",
                      placeholder: "Required"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("agreement", {
                  valuePropName: "checked"
                })(
                  <Checkbox>
                    When you submit your work you agree that your work can be
                    used for free for anything, anywhere by anyone.
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tlikes: state.LikeandShare,
    artistName: state.auth.user.fullname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditArtRequest: values => dispatch(editArtRequest(values))
  };
};

const WrappedImageItem = Form.create({ name: "editArt" })(ImageItem);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedImageItem);

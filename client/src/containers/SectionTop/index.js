import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
  message
} from "antd";
import "./styles.css";
import weerdBoxImg from "../../data/images/logo.png";
import Uploader from "../../components/Uploader";
import { submitArtRequest } from "./actions";
import { searchArtsRequest } from "../app/actions";

const { Search } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
class SectionTop extends React.Component {
  state = {
    visible: false,
    autoCompleteResult: [],
    imagename: "",
    art:
      "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let imgUrlname = this.state.art;
        console.log(imgUrlname);
        values.art = imgUrlname;
        values.imageName = this.state.imagename;
        this.props.onsubmitArtRequest(values);
        this.setState({
          visible: false
        });

        window.location.replace("/thanks");
        message.success("You have successfully uploaded your art!");
      }
    });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { isAuthenticated, onSearchArts } = this.props;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      );
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div className="wrapper">
        <div className="submitArtButton">
          <Button
            // type="primary"
            style={{
              color: "#FA08FF",
              background: "#CBF525",
              borderColor: "#CBF525",
              zIndex: "1"
            }}
            icon="upload"
            size="large"
            onClick={
              isAuthenticated
                ? this.showModal
                : () => message.warning("Please sign in to submit your art!")
            }
          >
            Submit Art
          </Button>
        </div>
        <Row>
          <Col
            // span={6}
            style={{ textAlign: "center" }}
            xs={24}
            sm={24}
            md={6}
            lg={6}
            xl={6}
          >
            <div className="leftDescription">
              <p style={{ marginBottom: "2rem", color: "black" }}>
                <Icon
                  type="thunderbolt"
                  style={{
                    fontSize: "20px",
                    color: "#FA08FF",
                    margin: "0 1rem"
                  }}
                />{" "}
                Join for free duh.{" "}
              </p>
              <p style={{ marginBottom: "2rem", color: "black" }}>
                {" "}
                <Icon
                  type="thunderbolt"
                  style={{
                    fontSize: "20px",
                    color: "#FA08FF",
                    margin: "0 1rem"
                  }}
                />{" "}
                Download and Use anything you <br />
                <span style={{ marginLeft: "55px", color: "black" }} /> want to
                make weerd things weerder.
              </p>
              <p style={{ marginBottom: "2rem", color: "black" }}>
                {" "}
                <Icon
                  type="thunderbolt"
                  style={{
                    fontSize: "20px",
                    color: "#FA08FF",
                    margin: "0 1rem"
                  }}
                />{" "}
                Upload your Weerd sketches,
                <br />
                <span style={{ marginLeft: "55px" }} /> paintings, doodles.{" "}
              </p>
            </div>
          </Col>
          <Col
            span={12}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            <div>
              <img src={weerdBoxImg} className="weerdboxbannerimage" />
            </div>
            <h3 className="subtitle">MAKE THE INTERNET WEERD WITH ME</h3>
            <p className="serviceDescription">
              Creatives making the internet internet unique and weerd again.
              <br />
              We do this by allowing the world to use our degenerate art and
              unloved creation for free.
            </p>
            <div className="searchbar">
              {" "}
              <Search
                placeholder=" Search by tag"
                onSearch={value => onSearchArts(value)}
                style={{ height: 45, fontSize: "24px" }}
              />
            </div>
            <div class="downArrow bounce">
              <img
                width="35"
                height="35"
                alt=""
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4="
              />
            </div>
          </Col>
          <Col
            span={6}
            span={12}
            xs={24}
            sm={24}
            md={6}
            lg={6}
            xl={6}
            style={{ textAlign: "right" }}
          />
        </Row>
        <Modal
          title="Submit Art"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
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
                    file.done(info =>
                      this.setState({ art: info.cdnUrl, imagename: info.name })
                    );
                  }
                }}
                onUploadComplete={info => {
                  this.setState({ art: info.cdnUrl + info.name });
                }}
              />
            </div>
            <img
              src={this.state.art ? this.state.art : ""}
              height="400px"
              width="500px"
            />
          </div>
          <div className="uploadForm">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please insert the name!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Website">
                {getFieldDecorator("website", {
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
                  rules: [
                    {
                      message: "Please enter the description of the image!"
                    }
                  ]
                })(<TextArea rows={4} style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Tags">
                {getFieldDecorator("tags", {
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
                    placeholder="Enter comma seperated values without space between the tags e.g car,bike,bus"
                  />
                )}
              </Form.Item>
              <Form.Item label="Email you used to signup">
                {getFieldDecorator("email", {
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
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    onsubmitArtRequest: values => dispatch(submitArtRequest(values)),
    onSearchArts: value => dispatch(searchArtsRequest(value))
  };
};

const WrappedRegistrationForm = Form.create({ name: "submitArt" })(SectionTop);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);

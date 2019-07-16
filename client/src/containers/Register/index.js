import React from "react";
import { Form, Input, Row, Col, Checkbox, Button, message } from "antd";
import { connect } from "react-redux";
import { signUpRequest } from "./actions";
import "./styles.css";
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    isReg: false
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.register && nextProps.register.isRegisterd) {
  //     message.success("Registered Successfully, Please login to continue");
  //     console.log(nextProps);
  //     window.location.replace("/login");
  //   }
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.onSignUpRequest(values);
      }
    });
  };
  componentDidMount() {
    if (this.props.register.isRegisterd) {
      this.setState({ isReg: true });
    }
  }
  componentWillUnmount() {
    this.setState({ isReg: false });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
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
      <Row>
        <Col span={13} offset={4} style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "1rem", marginLeft: "7rem" }}>Register</h1>
          <div>
            <Form
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              style={{ marginTop: "2rem" }}
            >
              <Form.Item label="Full Name">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your full name!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator("agreement", {
                  valuePropName: "checked"
                })(
                  <Checkbox>
                    I have read the <a href="">agreement</a>
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
          {this.props.register.isRegisterd &&
            message.success(
              "Successfully Registered Please Log in to continue"
            )}
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    onSignUpRequest: values => dispatch(signUpRequest(values))
  };
};
const mapStateToProps = state => {
  return {
    register: state.register
  };
};
const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);

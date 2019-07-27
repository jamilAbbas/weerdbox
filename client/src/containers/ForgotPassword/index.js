import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordRequest } from "./action";

class ForgotPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        this.props.onResetPasswordRequest(values.username);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ paddingTop: "5rem" }}>
        <Row>
          <Col span={8} offset={8} style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "1rem", marginLeft: "1rem" }}>
              Change Password
            </h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your Email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Your Email"
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    color: "black",
                    background: "#CBF525"
                  }}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    onResetPasswordRequest: values => dispatch(resetPasswordRequest(values))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.currentUser
  };
};

const WrappedForgotPasswordForm = Form.create({ name: "forgot_password" })(
  ForgotPassword
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForgotPasswordForm);

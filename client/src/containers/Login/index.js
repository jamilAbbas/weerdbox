import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequest } from "./actions";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLoginRequest(values);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.email === "pigeonhack1@gmail.com") {
        this.props.history.push("/admin");
      } else {
        this.props.history.push("/dashboard");
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ paddingTop: "5rem" }}>
        <Row>
          <Col span={8} offset={8} style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "1rem", marginLeft: "1rem" }}>Login</h1>
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
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <div style={{ marginTop: "-5px", marginBottom: "3px" }}>
                <Link className="login-form-forgot" to="/forgotpassword">
                  Forgot password
                </Link>
              </div>
              <Form.Item>
                <Button
                  style={{
                    color: "black",
                    background: "#CBF525"
                  }}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
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
    onLoginRequest: values => dispatch(loginRequest(values))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.currentUser
  };
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);

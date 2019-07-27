import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { resetPassword } from "./actions";
class ResetPasswordForm extends React.Component {
  state = {
    token: null
  };
  componentDidMount() {
    this.setState({
      token: this.props.match.params.token
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onResetPassword(values, this.state.token);
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
              Reset Password Form
            </h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your existing Email!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Existing Email"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your new password!"
                    }
                  ]
                })(<Input.Password />)}
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
    onResetPassword: (values, token) => dispatch(resetPassword(values, token))
  };
};

const WrappedResetPasswordForm = Form.create({
  name: "forgot_password_reset_form"
})(ResetPasswordForm);

export default connect(
  null,
  mapDispatchToProps
)(WrappedResetPasswordForm);

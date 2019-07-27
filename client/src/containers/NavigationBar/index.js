import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../data/images/logo22.png";
import { connect } from "react-redux";
import { setCurrentUser } from "../Login/actions";
import "./styles.css";
const { Header } = Layout;

class NavigationBar extends React.Component {
  logoutUser() {
    localStorage.removeItem("jwtToken");
    this.props.logout();
    window.location.replace("/");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Layout className="layousst">
        <Header style={{ backgroundColor: "white" }}>
          <Link to="/">
            <img className="logo" alt="logo" src={Logo} />
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              lineHeight: "64px",
              float: "right",
              backgroundColor: "white"
            }}
          >
            <Link
              to="/"
              style={{ marginLeft: "1rem", color: "black", fontWeight: "600" }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{ marginLeft: "1rem", color: "black", fontWeight: "600" }}
            >
              About
            </Link>
            <Link
              to="/rules"
              style={{ marginLeft: "1rem", color: "black", fontWeight: "600" }}
            >
              Rules
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  style={{
                    marginLeft: "1rem",
                    color: "black",
                    fontWeight: "600"
                  }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{
                    marginLeft: "1rem",
                    color: "black",
                    fontWeight: "600"
                  }}
                >
                  Login
                </Link>{" "}
              </>
            ) : (
              <>
                {user && user.email !== "pigeonhack1@gmail.com" ? (
                  <Link
                    to="/dashboard"
                    style={{
                      marginLeft: "1rem",
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/admin"
                    style={{
                      marginLeft: "1rem",
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    Admin
                  </Link>
                )}

                <Button
                  style={{
                    color: "black",
                    background: "#CBF525",
                    marginLeft: "1rem"
                  }}
                  onClick={() => this.logoutUser()}
                >
                  Logout
                </Button>
              </>
            )}
          </Menu>
        </Header>
        {/* <Footer style={{ textAlign: "center" }}>Designed by j@mil</Footer> */}
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setCurrentUser({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

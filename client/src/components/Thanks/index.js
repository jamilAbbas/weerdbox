import React from "react";
import { Button } from "antd";
import Logo from "../../data/images/logo.png";
import { Link } from "react-router-dom";
import "./styles.css";
const Thanks = () => (
  <div className="thanksWrapper">
    <img src={Logo} alt="logo" width="15%" height="auto" />
    <h1 style={{ fontSize: "2rem" }}>Thanks for Submitting!</h1>
    <p style={{ fontSize: "1rem" }}>
      I have to review this real quick and it should be up in few zepto seconds
    </p>
    <Link to="/">
      <Button type="primary" style={{ width: "13rem" }} size="large" block>
        Go back To Home
      </Button>
    </Link>
  </div>
);

export default Thanks;

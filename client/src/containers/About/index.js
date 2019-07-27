import React from "react";
import "./about.css";
import Logoo from "../../data/images/cpy.png";
import { Row, Col } from "antd";

class about extends React.Component {
  render() {
    return (
      <div className="containerDiv">
        <Row style={{ textAlign: "center" }}>
          <Col
            className="colAbout"
            span={12}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{ textAlign: "center" }}
          >
            <div className="divLogo">
              <img src={Logoo} />
            </div>

            <h2>MAKE WEERD THINGS</h2>
            <p>
              Collect odd imagery, art, illustrations and other things that
              seems to burp in your face.
            </p>
            <p>
              Free imagery given to you by gifted artists to use for whatever
              projects or weird things you're into.
            </p>
            <p>
              Help us help more artists get more eyeballs on their works so they
              can keep making cool shit.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default about;

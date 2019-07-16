import React from "react";
import "./about.css"; 
import Logoo from "../../data/images/cpy.png";
import { Row, Col } from "antd";


class about extends React.Component{
    render(){

        
        return(
          
            
            <Row style={{textAlign:"center"}}>

            <Col className="colAbout" span={13} offset={5} style={{ textAlign: "center" }}>
            <img  src={Logoo} />
            <h2>MAKE WEERD THINGS</h2>
            <p>Collect odd imagery, art, illustrations and other things that seems to burp in your face.</p>
            <p>Free imagery given to you by gifted artists to use for whatever projects or weird things you're into.</p>
            <p>Help us help more artists get more eyeballs on their works so they can keep making cool  shit.</p>
            </Col>
        </Row>
           
        );
    }
}
export default about;
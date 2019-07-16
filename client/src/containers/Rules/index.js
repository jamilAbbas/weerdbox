import React from "react";
import { Row, Col } from "antd";
import "./styles.css";



class Rules extends React.Component{
    render(){
        return(
            
            <Row style={{textAlign:"center"}}>
                <Col className="colCLs" span={13} offset={5} style={{ textAlign: "center"}}>
                <h1>Rules</h1>
                <p>- No Hard Porn (it's killing our minds)</p>
                <p>- You must own the art and it must be created by you when you share it.</p>
                <p>- Although it is not required please give credit to your artists in your creations when you can.</p>
                </Col>
            </Row>
          
        );
    }
}
export default Rules;
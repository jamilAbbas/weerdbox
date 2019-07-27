import React from "react";
import { Button } from "antd";
import "./styles.css";
class Photos extends React.Component {
  render() {
    const { allArts } = this.props;
    return (
      <div>
        <h1>All Photos</h1>
        {allArts &&
          allArts.map((art, key) => (
            <div className="singlePhoto">
              <img src={art.art} alt="some art" height="200" width="200" />
            </div>
          ))}
      </div>
    );
  }
}

export default Photos;

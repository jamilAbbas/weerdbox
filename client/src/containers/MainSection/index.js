import React from "react";
import { Card, Icon, Avatar, Layout, Row, Col } from "antd";
import ImageItem from "../../components/ImageItem";

import { connect } from "react-redux";
import "./styles.css";

const { Meta } = Card;
class MainSection extends React.Component {
  render() {
    const { arts, allarts } = this.props;
    return (
      <div class="imagesContainer">
        {allarts.length != 0 &&
          allarts.map(ar => (
            <ImageItem
              name={ar.name}
              email={ar.email}
              likes={ar.likes}
              image={ar.art}
              shares={ar.shares}
              imageId={ar._id}
              tags={ar.tags}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    arts: state.arts,
    allarts: state.allArts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    // onGetAllArts: values => dispatch(getAllArts(values))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);

import React from "react";
import { Card, Icon, Avatar, Layout, Row, Col } from "antd";
import ImageItem from "../../components/ImageItem";

import { connect } from "react-redux";
import "./styles.css";

const { Meta } = Card;
class MainSection extends React.Component {
  render() {
    const { arts, allarts } = this.props;
    const approvedArts =
      allarts && allarts.filter(arts => arts.status === "approved");
    return (
      <div class="imagesContainer">
        {approvedArts.length != 0 &&
          approvedArts.map(ar => (
            <ImageItem
              name={ar.name}
              email={ar.email}
              likes={ar.likes}
              image={ar.art}
              shares={ar.shares}
              imageId={ar._id}
              tags={ar.tags}
              description={ar.description}
              website={ar.website}
              contact={ar.phone}
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

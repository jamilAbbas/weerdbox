import React from "react";
import ImageItem from "../../components/ImageItem";
import { connect } from "react-redux";
import { getMyArts } from "./actions";
class Dashboard extends React.Component {
  componentDidMount() {
    const { getMyArts, auth } = this.props;
    const { id, email } = auth.user;
    getMyArts(id, email);
  }

  render() {
    const { myarts } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <h1 style={{ paddingTop: "6rem" }}>My Arts</h1>
          {myarts &&
            myarts.length > 0 &&
            myarts.map(ar => {
              return (
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
                  page="dashboard"
                />
              );
            })}
          {myarts && myarts.length === 0 && (
            <p>
              {" "}
              You have currently not uploaded any arts. You can upload your arts
              from the homepage
            </p>
          )}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMyArts: (id, email) => dispatch(getMyArts(id, email))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    myarts: state.myarts.myarts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

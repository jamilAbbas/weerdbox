import React from "react";
import ImageItem from "../../components/ImageItem";
import { connect } from "react-redux";
import { getMyArts } from "./actions";
class Dashboard extends React.Component {
  componentDidMount() {
    console.log("compnnt", this.props);
    const { getMyArts, auth } = this.props;
    const { id, email } = auth.user;
    getMyArts(id, email);
  }

  render() {
    const { myarts } = this.props;
    console.log("--------------------my arts----------------");
    console.log(myarts);
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <h1 style={{ marginTop: "2rem" }}>My Arts</h1>
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
                  imagId={ar._id}

                />
              );
            })}
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

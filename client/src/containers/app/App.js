import React from "react";
import "./App.css";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import Logo from "../../data/images/weerdlogo_white.png";
import SectionTop from "../SectionTop";
import MainSection from "../../containers/MainSection";
import NavigationBar from "../../containers/NavigationBar";
import { connect } from "react-redux";
import { getAllArts } from "./actions";
const { Content, Footer } = Layout;
class App extends React.Component {
  componentDidMount() {
    this.props.onGetAllArts();
  }

  render() {
    return (
      <Layout className="layout">
        <Content>
          <div
            className="divMain"
            style={{
              background: "#fff",
              minHeight: 280
            }}
          >
            <SectionTop />
            <MainSection />
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    arts: state.arts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    onGetAllArts: values => dispatch(getAllArts(values))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

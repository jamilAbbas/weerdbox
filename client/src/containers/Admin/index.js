import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

import AllEmails from "../../components/AllEmails";
import RequestedUploads from "../../components/RequestedUploads";
import ApprovedUploads from "../../components/ApprovedUploads";
import AllUploads from "../../components/AllUploads";
import Photos from "../../components/Photos";
import { getAllArts } from "../app/actions";
import { approveArt, disApproveArt, deleteArt } from "./actions";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Admin extends React.Component {
  state = {
    collapsed: false,
    showAllEmails: true,
    showNewEmails: false,
    showAllUploads: false,
    showRequestUploads: false,
    showApprovedUploads: false,
    showAllPhotos: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount() {
    const { onGetAllArts } = this.props;
    onGetAllArts();
  }
  handleSelection(values) {
    console.log("----handleSelection,", values);
    if (values === "showAllEmails") {
      this.setState({
        showAllEmails: true,
        showNewEmails: false,
        showAllUploads: false,
        showRequestUploads: false,
        showApprovedUploads: false,
        showAllPhotos: false
      });
    }
    if (values === "showNewEmails") {
      this.setState({
        showAllEmails: false,
        showNewEmails: true,
        showAllUploads: false,
        showRequestUploads: false,
        showApprovedUploads: false,
        showAllPhotos: false
      });
    }
    if (values === "showAllUploads") {
      this.setState({
        showAllEmails: false,
        showNewEmails: false,
        showAllUploads: true,
        showRequestUploads: false,
        showApprovedUploads: false,
        showAllPhotos: false
      });
    }
    if (values === "showRequestUploads") {
      this.setState({
        showAllEmails: false,
        showNewEmails: false,
        showAllUploads: false,
        showRequestUploads: true,
        showApprovedUploads: false,
        showAllPhotos: false
      });
    }
    if (values === "showApprovedUploads") {
      this.setState({
        showAllEmails: false,
        showNewEmails: false,
        showAllUploads: false,
        showRequestUploads: false,
        showApprovedUploads: true,
        showAllPhotos: false
      });
    }
    if (values === "showAllPhotos") {
      this.setState({
        showAllEmails: false,
        showNewEmails: false,
        showAllUploads: false,
        showRequestUploads: false,
        showApprovedUploads: false,
        showAllPhotos: true
      });
    }
  }
  render() {
    const { allArts, onApproveArt, onDisapproveArt, onDeleteArt } = this.props;
    const newEmails =
      allArts && allArts.filter(art => art.status === "requested");
    return (
      <Layout style={{ minHeight: "100vh", paddingTop: "4rem" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Emails</span>
                </span>
              }
            >
              <Menu.Item
                key="1"
                onClick={() => this.handleSelection("showAllEmails")}
              >
                All Emails
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => this.handleSelection("showNewEmails")}
              >
                New Emails
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="pie-chart" />
                  <span>Uploads</span>
                </span>
              }
            >
              <Menu.Item
                key="3"
                onClick={() => this.handleSelection("showRequestUploads")}
              >
                Requested Uploads
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => this.handleSelection("showApprovedUploads")}
              >
                Approved Uploads
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => this.handleSelection("showAllUploads")}
              >
                All Uploads
              </Menu.Item>
            </SubMenu>

            <Menu.Item
              key="6"
              onClick={() => this.handleSelection("showAllPhotos")}
            >
              <Icon type="desktop" />
              <span>All Photos</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "16px 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.state.showAllEmails && <AllEmails allArts={allArts} />}
              {this.state.showNewEmails && <AllEmails allArts={newEmails} />}
              {this.state.showRequestUploads && (
                <RequestedUploads
                  allArts={allArts}
                  onApproveArt={onApproveArt}
                />
              )}
              {this.state.showAllUploads && (
                <AllUploads allArts={allArts} onDeleteArt={onDeleteArt} />
              )}
              {this.state.showApprovedUploads && (
                <ApprovedUploads
                  allArts={allArts}
                  onDisapproveArt={onDisapproveArt}
                />
              )}
              {this.state.showAllPhotos && <Photos allArts={allArts} />}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            j@mil Created with Love :)
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    onGetAllArts: () => dispatch(getAllArts()),
    onApproveArt: id => dispatch(approveArt(id)),
    onDisapproveArt: id => dispatch(disApproveArt(id)),
    onDeleteArt: id => dispatch(deleteArt(id))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.currentUser,
    allArts: state.allArts
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

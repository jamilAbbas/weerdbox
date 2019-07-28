import React from "react";
import { Table, Divider, Tag, Spin, Button } from "antd";

class RequestedUploads extends React.Component {
  render() {
    const { allArts, onApproveArt } = this.props;
    console.log("onapprove RequestedUploads ", this.props);
    const requestedArts =
      allArts && allArts.filter(art => art.status === "requested");
    const columns = [
      {
        title: "Art",
        dataIndex: "art",
        key: "art",
        render: art => (
          <img src={art} height="100px" width="100px" alt="some car pic" />
        )
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Likes",
        dataIndex: "likes",
        key: "likes"
      },
      {
        title: "Contact Email",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website"
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            {/* <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" /> */}
            <Button type="primary" onClick={() => onApproveArt(record._id)}>
              Approve
            </Button>
          </span>
        )
      }
    ];

    return (
      <Spin tip="Loading..." spinning={false}>
        <Table columns={columns} dataSource={requestedArts} />;
      </Spin>
    );
  }
}

export default RequestedUploads;

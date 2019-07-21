import React from "react";
import { Table, Divider, Tag, Spin, Button } from "antd";

class ApprovedUploads extends React.Component {
  render() {
    const { allArts, onDisapproveArt } = this.props;
    console.log("onapprove RequestedUploads ", this.props);
    const approvedArts =
      allArts && allArts.filter(art => art.status === "approved");
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
        title: "Phone",
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
            <Button type="danger" onClick={() => onDisapproveArt(record._id)}>
              Disapprove
            </Button>
          </span>
        )
      }
    ];

    return (
      <Spin tip="Loading..." spinning={false}>
        <Table columns={columns} dataSource={approvedArts} />;
      </Spin>
    );
  }
}

export default ApprovedUploads;

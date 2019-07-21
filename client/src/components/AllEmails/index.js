import React from "react";
import { Table, Divider, Tag, Spin } from "antd";

class AllEmails extends React.Component {
  render() {
    const { allArts } = this.props;
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Art",
        dataIndex: "art",
        key: "art",
        render: art => (
          <img src={art} height="50px" width="auto" alt="some car pic" />
        )
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
      }
      // {
      //   title: "Action",
      //   key: "action",
      //   render: (text, record) => (
      //     <span>
      //       {/* <a href="javascript:;">Invite {record.name}</a>
      //       <Divider type="vertical" /> */}
      //       <a href="javascript:;">Delete</a>
      //     </span>
      //   )
      // }
    ];

    return (
      <Spin tip="Loading..." spinning={false}>
        <Table columns={columns} dataSource={allArts} />;
      </Spin>
    );
  }
}

export default AllEmails;

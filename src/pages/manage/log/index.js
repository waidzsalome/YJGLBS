import React from "react";
import { Table, Divider, Tag, Pagination } from 'antd';
import logData from "../../../assets/logData";

const columns = [
  {
    title: '操作人员',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '所属部门',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '所属级别',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作行为',
    key: 'tags',
    dataIndex: 'tags',
    // render: tags => (
    //   <span>
    //     {/* {tags.map(tag => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })} */}
    //   </span>
    // ),
  },
  {
    title: '操作时间',
    key: 'action',
    dataIndex:"time"
  },
];



const Log = ()=> {
    return(
        <div>
            <h3>
              操作日志
            </h3>
            <Table columns={columns} dataSource={logData} style = {{width:"80%",margin: "0 auto"}} Pagination = {false} />
            {/* <Pagination defaultCurrent={1} total={50} pageSizeOptions = {["5"]} /> */}
        </div>
    )
}
export default Log;
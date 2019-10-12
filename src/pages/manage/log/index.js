import React from "react";
import { Table, Divider, Tag } from 'antd';
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
            <Table columns={columns} dataSource={logData} />
        </div>
    )
}
export default Log;
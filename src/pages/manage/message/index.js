import React from "react";
import styles from "./index.css";
import { Table } from 'antd';
import messageData from "../../../assets/messageData";

const columns = [
  {
    title: '操作人',
    dataIndex: 'handler',
    key: 'handler',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '说明',
    dataIndex: 'explan',
    key: 'explan',
  },
  {
    title: '操作',
    key: 'handle',
    dataIndex: 'handle'
  },
  {
    title: '时间',
    key: 'time',
    dataIndex:"time"
  },
];



const Message = ()=> {
    return(
        <div>
            <h3>消息通知</h3>
            <Table columns={columns} dataSource={messageData} />
        </div>
    )
}
export default Message;
import React from "react";
import styles from "./index.css";
import { Table, Button } from 'antd';
import messageData from "../../../assets/messageData";

const publish = ()=> {
  console.log("pub")
  //在这里写确认发布的请求
}

const handleFunc = (handle)=>{
  if(handle) {
    return(
      <Button onClick = {()=>{ publish()}}>
        确认发布
      </Button>
    )
  }
  else return (
    <div>无可用操作</div>
  )
}

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
    dataIndex: 'handle',
    render: handle=>(
      <span>
        {
          handleFunc(handle)
        }
      </span>
    )
  },
  {
    title: '时间',
    key: 'time',
    dataIndex:"time"
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    const  selectedId = selectedRows.map((item)=>{
      return item.id;
    })
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedId );
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


const Message = ()=> {
    return(
        <div>
            <h3>消息通知</h3>
            <Table columns={columns} dataSource={messageData}  rowSelection={rowSelection}/>
        </div>
    )
}
export default Message;
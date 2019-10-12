import React from "react";
import styles from "./index.css";
import Link from "umi/link";
import { Table,Input, Button, Popover } from 'antd';
import { useState, useEffect } from "react";
import fileData from "../../../../assets/fileData";
const { Search } = Input;
const getFileContent = (content)=>{
  return(
    <div className = { styles.fileContent }>
      {content}
    </div>
  )
}
const del = (id)=> {
  console.log("永久删除",id);
  //在这里写永久删除按钮的函数
}
const columns = [
  {
    title: '文件',
    dataIndex: 'file',
    key: 'file',
    render: file =>(
      <div className = {styles.handle }>
        <img src = { file.picUrl}  width = "126px" height = "126px" alt = ""/>
        <div>
          <p>{  file.name } </p>
          <p> { file.type } </p>
          <div> 
          <Button size = "small">编辑</Button>  
          <Button size = "small" onClick = {()=>{ del( file.id ) }} >永久删除</Button>  
          <Popover content={getFileContent(file.content)}>
            <Button size = "small">查看说明</Button>  
          </Popover>
   
          </div>
        </div>

      </div>
    )
  },
  {
    title: '上传者',
    dataIndex: 'uploader',
    key: 'uploader',
  },
  {
    title: '日期',
    key: 'time',
    dataIndex: 'time',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    const selectedId = selectedRows.map((item)=>{
      return item.id;
    })
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedId);
    //这里获取了所以被选中的选项的id
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


const App = ()=> {
    return(
        <div>
            <Table columns={columns} dataSource={fileData}  rowSelection={rowSelection}/>
        </div>
    )
}
const FileHeader = ()=> {
  const [ isCreateShow,setisCreateShow ] = useState(false);
    return(
        <div className = { styles.FileHeader }>
            <span className = { styles.name }>
                文件管理
            </span>
            <div className = { styles.create } onClick = {()=>{setisCreateShow(true)}} onBlur = {()=>{setisCreateShow(false)}}>
                <Button >新建文件</Button>
                <div >
                    <ul className = {isCreateShow?styles.createList:styles.hide}>
                        <li>
                            <Link to = "/">新建文件夹</Link>
                        </li>
                        <li>
                            <Link to = "/manage/directory/file/CreateFile">新建文档</Link>
                        </li>
                        <li>
                            <Link to = "/">新建图片</Link>
                        </li>
                    </ul>

                </div>

            </div>
            <Search placeholder="请输入搜索内容" onSearch={value => console.log(value)} enterButton className = {styles.search} />
        </div>
    )
}




const File = ()=> {
    return (
        <div>
            <FileHeader />
            <div className = { styles.subbar }>
              <Button >批量删除</Button>
              <span>X个项目</span>
            </div>
            <App />
        </div>
    )
}
export default File;
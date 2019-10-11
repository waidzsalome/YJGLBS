import React from "react";
import styles from "./index.css";
import { Button } from "antd";
import Link from "umi/link";
import { Checkbox, Row, Col, Popover,Card,Input } from 'antd';
import { useState, useEffect } from "react";
import classnames from "classnames";

const { Search } = Input;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

class App extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
    isInfoShow: false
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <div className = { styles.app }>
        <div style={{ borderTop: '1px solid #E9E9E9',marginTop:"15px" }}  
            className = { styles.checkAll }
            >
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            选择全部
          </Checkbox>
          <span className = { styles.file }>文件</span>
          <span className = { styles.uploader }>上传者</span>
          <span className = { styles.uploadTo }>上传至</span>
          <span className = { styles.uploadDate }>日期</span>
        </div>
        <Checkbox.Group onChange={this.onChange} style = {{width:"100%"}}>
        <Row type = "flex" justify = "start" >
        {
          plainOptions.map((item,index)=> {
            return (
              <Col span={24}   className = { styles.item }>
                <Checkbox value={item} className = {styles.checkBox} 
               >
                </Checkbox>
                <img alt = "" width = "126px" height = "126px" 
                src ={ "http://yjgl.hebei.gov.cn/portal/resources/images/file-read-5479.jpg"} />
                <div className = { styles.iteminfo }>
                <span>文件名称</span>
                <span>文件名称+文件类型</span>
                <div className = { styles.itemHandle } >
                  <Link to = "/">
                    编辑
                  </Link>
                  <span>永久删除</span>
                  <div  onClick = {()=>{this.setState({isInfoShow:true})}} onBlur = {()=>{this.setState({isInfoShow:false})}}>
                    查看说明
                    <div className = {this.state.isInfoShow?styles.itemintrduce:styles.hide}
                    >
                      {"ssadsadasgjhkjhjhjhjhsagkdfafgsadkfad"}
                    </div>
                  </div>
                </div>
                </div>
                <span className = {styles.itemupLoader}>雷鹏飞</span>
                <Button className = {styles.itemuploadTo}>上传</Button>
                <span className = {styles.itemuploadDate}>上传的日期</span>
              </Col>
            )
          })
        }
              </Row>

        </Checkbox.Group>
      </div>
    );
  }
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
                            <Link to = "/manage/directory/file/EditFile">新建文件夹</Link>
                        </li>
                        <li>
                            <Link to = "/manage/directory/file/EditFile">新建文档</Link>
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
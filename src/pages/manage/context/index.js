import React from "react";
import styles from "./index.css";
import { Input, Button, Switch } from "antd";
import contextData from "../../../assets/contextData";

const { Search } = Input;

const ContextHeader = ()=> {
    return (
        <div className = {styles.header}>
            <span>内容管理</span>
            <Button>新建内容</Button>
        </div>
    )
}



const ContextContent = ()=> {
    return (
        <div>
            <div className = { styles.contentHeader } >
            <span>序列</span>
            <span>文章名称</span>
            <span>发布部门</span>
            <span>日期</span>
            <span>文章位置</span>
            <span>页面状态</span>
            </div>
            {
                contextData.map((item,index)=>{
                    return (
                        <div className = { styles.item }>
                            <span>{item.id}</span>
                            <span>{item.title}</span>
                            <span>{item.section}</span>
                            <span>{item.loaction}</span>
                            <span>
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked = {item.isShow}  />
                            </span>
                        </div>
                    )

                })


            }
        </div>
    )

}
const Context = ()=> {
    return(
        <div  >
            <ContextHeader />
            <Search placeholder="请输入搜索内容" onSearch={value => console.log(value)} enterButton className = {styles.search} />
            <ContextContent />
        </div>
    )
}

export default Context;
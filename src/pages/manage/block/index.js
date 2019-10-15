import React from "react";
import styles from "./index.css";
import { Table, Button, Input, Switch } from 'antd';
import * as blockData from "../../../assets/blockData";
import * as blockCol from "../../../assets/blockCol";

const HeaderScroll = ()=> {
    return(
        <div>
            <h3>顶部滚动条</h3><Button>添加顶部滚动条</Button>
            <Table columns={blockCol.headerScrollCol} dataSource={ blockData.headerScrollData }  pagination = {false}/>
        </div>
    )
}
const Carousel = ()=> {
    return(
        <div>
            <h3>轮播图</h3><Button>添加轮播图</Button>
            <Table columns={blockCol.carouselCol } dataSource={ blockData.carouselData}  pagination = {false}/>
        </div>
    )
}

const HomeTopic = ()=> {
    return(
        <div>
            <h3>专题专栏</h3>
            <Table columns={blockCol.homeTopicCol } dataSource={  blockData.homeTopicData} pagination = {false}/>
        </div>
    )
}

const Public = ()=> {
    return(
        <div>
            <h3>信息公开</h3>
            <h3>专栏1</h3>
            <Table columns={blockCol.publicCol   } dataSource={  blockData.publicData1} pagination = {false}/>
            <h3>专栏2</h3>
            <Table columns={blockCol.publicCol   } dataSource={  blockData.publicData2} pagination = {false}/>
            <h3>专栏3</h3>
            <Table columns={blockCol.publicCol   } dataSource={  blockData.publicData3} pagination = {false}/>
        </div>
    )
}
const Background = ()=> {
    return(
        <div>
             <h3>背景图片</h3>
            <Table columns={blockCol.backgroundCol } dataSource={  blockData.backgroundData} pagination = {false}/>
        </div>
    )
}
const block = ()=> {
    return(
        <div>
            <HeaderScroll />
            <Carousel />
            <HomeTopic />
            <Public />
            <Background />
        </div>
    )
}
export default block;
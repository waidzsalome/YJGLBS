import React, { useEffect, useState } from 'react';
import styles from './index.css';
import { Table, Button, Input, Switch, message } from 'antd';
import * as blockData from '../../../assets/blockData';
import * as blockCol from '../../../assets/blockCol';
import axios from 'axios';

const HeaderScroll = () => {
  return (
    <div>
      <div className={styles.title}>
        <span>顶部滚动条</span>
      </div>
      <Button>添加顶部滚动条</Button>
      <Table
        columns={blockCol.headerScrollCol}
        dataSource={blockData.headerScrollData}
        pagination={false}
      />
    </div>
  );
};
const Carousel = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/carousel').then(res => {
      if (res.data.code === 0) {
        console.log(res.data);
        setdata(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <span>轮播图</span>
      </div>
      <Button>添加轮播图</Button>
      <Table
        columns={blockCol.carouselCol}
        dataSource={/* blockData.carouselData   */ data}
        pagination={false}
        // onChange = {()=>{}}
      />
    </div>
  );
};

const HomeTopic = () => {
  return (
    <div>
      <div className={styles.title}>
        <span>专题专栏</span>
      </div>
      <Table
        columns={blockCol.homeTopicCol}
        dataSource={blockData.homeTopicData}
        pagination={false}
      />
    </div>
  );
};

const Public = () => {
  return (
    <div>
      <div className={styles.title}>
        <span>信息公开</span>
      </div>
      <h3>专栏1</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData1} pagination={false} />
      <h3>专栏2</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData2} pagination={false} />
      <h3>专栏3</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData3} pagination={false} />
    </div>
  );
};
const Background = () => {
  return (
    <div>
      <div className={styles.title}>
        <span>背景图片</span>
      </div>
      <Table
        columns={blockCol.backgroundCol}
        dataSource={blockData.backgroundData}
        pagination={false}
      />
    </div>
  );
};
const block = () => {
  return (
    <div>
      <HeaderScroll />
      <Carousel />
      <HomeTopic />
      <Public />
      <Background />
    </div>
  );
};
export default block;

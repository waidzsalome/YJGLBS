import React, {useState,useEffect} from "react";
import {Radio,Input,Icon,Table,Button} from "antd";
import styles from "./index.css";

export default function ColManage() {
  
  // 后端data
  const [data, setCols] = useState([]);
  // 待编辑的data
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 后端数据渲染进data里
    setCols([
      {
        key: "1",
        col: "首页",
        weight: 100,
      },
      {
        key: "2",
        col: "新闻中心",
        weight: 101,
      },
      {
        key: "3",
        col: "政府公开",
        weight: 103,
      },
      {
        key: "4",
        col: "安全生产",
        weight: 104,
      },
      {
        key: "5",
        col: "防灾减灾",
        weight: 105,
      },
      {
        key: "6",
        col: "应急救援",
        weight: 106,
      },
      {
        key: "7",
        col: "党建工作",
        weight: 107,
      },
      {
        key: "8",
        col: "社会服务",
        weight: 108
      },
    ]);
  }, []);

  const columns = [
    {
      title: "栏目",
      dataIndex: "col",
      key: "col", 
      className: `${styles.column}`,
      render: (text) => <span>{text}</span>
    },
    {
      title: "修改后的新栏目名",
      dataIndex: "newCol",
      key: "newCol",
      className: `${styles.column}`,
      render: () => <Input placeholder="请输入新栏目名" style={{width: "150px"}}/>
    },
    {
      title: "页面状态",
      dataIndex: "pageState",
      key: "pageState",
      className: `${styles.column}`,
      render: () => (
                      <Radio.Group className={styles.radioGroup} name="pageState" defaultValue={1}>
                        <Radio value={1} className={styles.radio}>显示</Radio>
                        <Radio value={2}>隐藏</Radio>
                      </Radio.Group>
                    ) 
    },
    {
      title: "权重",
      dataIndex: "weight",
      key: "weight",
      className: `${styles.column}`,
      render: () => <Input style={{width: "50px"}}/>
    },
    {
      title: "链接地址",
      dataIndex: "link",
      key: "link",
      className: `${styles.column}`,
      render: () => <Input placeholder="http://" />
    },
    {
      title: () => (
                    <Button type="primary" onClick={handleNewBtn}>
                      <Icon type="plus" />
                      新建
                    </Button>
                   ),
      dataIndex: "delete",
      key: "delete",
      render: (text,record,index) => <a onClick={() => handleDelBtn(index)}><Icon type="delete" theme="twoTone" /></a>
    }
  ];
  const handleNewBtn = () => {
    setEditData([...editData,{key: `${editData.length+1}`, col: "新栏目"}])
  }
  const handleDelBtn = (index) => {
    editData.splice(index, 1);
    setEditData([...editData]);
  }
  const handleEditBtn = () => {
    setEditData([...data]);
  }
  return (
    <React.Fragment>
      <div style={{display: "flex",flexFlow: "row nowrap",marginTop: "20px"}}>
        <ul className={styles.list}>
          {
            data.map((item,index) => (
              <li className={styles.li}>
                <a className={index<data.length-1 ? styles.navTextB : styles.navText}>{item.col}</a>
              </li>
            ))
          }
        </ul>
        <Button　
          type="primary"
          className={styles.editBtn}
          onClick={handleEditBtn}
        >
          编辑栏目
        </Button>
      </div>
       <Table 
        columns={columns} 
        dataSource={editData} 
        pagination={false}
      />
       <Button 
          type="primary"
          className={styles.submitBtn}
          loading = {loading}
          onClick = {() => setLoading(true)}
       >
         提交
       </Button>
    </React.Fragment>
  );
}




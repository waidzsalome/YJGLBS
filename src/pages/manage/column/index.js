import React, {useState,useEffect,useReducer} from "react";
import {Radio,Input,Icon,Table,Button,Menu} from "antd";
import styles from "./index.css";
import dataSource from "./dataSource";

export default function ColManage() {

  // 后端data
  const [data, setCols] = useState([]);
  //二级栏目文章列表
  const [articles, setArticles] = useState([]);
  //二级栏目列表
  const [secCols, setSecCols] = useState([]);
  // 待编辑的data
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editState, setEditState] = useState("二级");
  // 二级文章列表是否处于编辑状态
  const [edit, setEdit] = useState([]);
  // 位于的某二级栏目
  const [secCol, setSecCol] = useState("");
  // 位于的某二级栏目标识key
  const [secColKey, setSecColKey] = useState("");
  // 位于的某一级栏目
  const [col, setCol] = useState("");
  // 是否在修改栏目名
  const [secColEdit, setSecColEdit] = useState(false);
  
  const renderRadio = (text, record, index) => {
    const State =
    edit[index] ?
      <Radio.Group className={styles.radioGroup} name="pageState" defaultValue={record.state === "显示" ? 1 : 2} onChange={(e) => handleRadioChange(index, record, e)}>
        <Radio value={1} className={styles.radio}>显示</Radio>
        <Radio value={2} className={styles.radio}>隐藏</Radio>
      </Radio.Group> :
      <span>{articles[index].state}</span>
    return State;
  }
  useEffect(() => {
    // console.log(dataSource)
    // 后端数据渲染进data里
    setCols(dataSource.data);
    setSecCols(dataSource.secCols);
    // 根据secCol获取文章列表 path: 新闻中心/二级栏目1
    setArticles(dataSource.articles[0].articles);
    // useState()是异步的，需要后端能直接返回文章数量
    setEdit([false, false, false]);
    
  }, []);
  useEffect(() => {
    secCols.length !== 0 && setSecCol(secCols[0].col);
    setCol(dataSource.articles[0].col);
    setSecColKey(dataSource.secCols[0].key);
  }, [secCols, data]);
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
      render: renderRadio
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
  
  const secondaryColumn = [
    {
      title: "序列",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "文章名称",
      dataIndex: "articleName",
      key: "articleName",
      render: (text,record,index) => {
        return edit[index] ? <Input defaultValue={text} style={{width: 200}} onChange={(e) => handleArtiChange(e, index)}/>:
        <span>{text}</span>
      }
    },
    {
      title: "发布部门",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "页面状态",
      dataIndex: "pageState",
      key: "pageState",
      render: renderRadio
    },
    {
      title: "",
      dataIndex: "oper",
      key: "oper",
      render: (text, record, index) => (
        <div>
          {
            !edit[index] ?
            <>
              <Button type="primary" onClick={() => handleEditClick(index)}>编辑</Button>
              <Button type="danger" onClick={() => handleDelClick(index)}>删除</Button>
            </>:
            <Button type="primary" onClick={() => handleASureClick(index, record)}>确定</Button>
          }
        </div>
      )
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
  const handleColClick = () => {

  }
  const handleSecColClick = ({item, key}) => {
    // 需要后端文章数量的数据
    setEdit([false, false, false]);
    setSecColKey(key);
    setSecCol(item.props.children);
    // 每次点击二级栏目名，获取后端数据
    const arr = dataSource.articles.find((item) => {
      return item.key === key;
    }).articles;
    setArticles(arr);
  }
  const handleAddSeColClick = () => {
    let arr = [...secCols];
    arr.push({
      key: `${parseInt(secCols[secCols.length-1].key)+1}`,
      col: "新栏目",
    });
    setSecCols(arr);
  }
  const handleEditClick = (index) => {
    const arr = [...edit];
    arr.splice(index, 1 ,true);
    setEdit(arr);
  }
  const handleArtiChange = (e, index) => {
    let article = articles[index];
    article = {...article, articleName: e.target.value};
    let arr = [...articles];
    arr.splice(index,1,article);
    setArticles(arr);
  }
  const handleASureClick = (index, record) => {
    const arr = [...edit];
    arr.splice(index, 1 ,false);
    setEdit(arr);
  }
  const handleRadioChange = (index, record, e) => {
    if(e.target.value !== (record.state === "显示" ? 1 : 2)) {
       let article = articles[index];
       article = {...article, state: e.target.value === 1 ? "显示" : "隐藏"};
       let arr = [...articles];
       arr.splice(index, 1, article);
       setArticles(arr);
    } else {
      return;
    }
  }
  const handleRenameClick = () => {
    setSecColEdit(true);
  }
  const handleRenameSureClick = () => {
    setSecColEdit(false);
    let _secCols = [...secCols];
    let _secCol = secCols.find(item => {
      return item.key === secColKey;
    });
    let index = _secCols.indexOf(_secCol);
    _secCol.col = secCol;
    _secCols.splice(index, 1, _secCol);
    setSecCols(_secCols);
  }
  const handleDelClick = (index) => {
    let arr = [...articles];
    arr.splice(index, 1);
    setArticles(arr);
  }
  const DelSecCol = () => {

    let _secCols = [...secCols];
    let _secCol = secCols.find(item => {
      return item.key === secColKey;
    });
    let index = _secCols.indexOf(_secCol);
    _secCols.splice(index, 1);
    setSecCols(_secCols);
    setSecCol(_secCols[0].col);

  }
  return (
    <React.Fragment>
      <div style={{display: "flex",flexFlow: "row nowrap",marginTop: "20px"}}>
        <ul className={styles.list}>
          {
            data.map((item,index) => (
              <li className={styles.li} onClick={handleColClick}>
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
      <div className={styles.columnContainer}>
        <Menu
          style={{width: 130, height: 483}}        
          selectedKeys={[`${secColKey}`]}
          defaultSelectedKeys={["1"]}
          mode={"vertical"}
          theme={"dark"}
        >
          <div style={{height: 36, lineHeight: "36px"}}>{col}</div>
          {
            secCols.map((item, index) => {
              return (
                <Menu.Item key={item.key} onClick={handleSecColClick}>{item.col}</Menu.Item>
              );
            })
          }
          <Button type="primary" style={{width: 85, marginTop: 20, padding: 0}} onClick={handleAddSeColClick}>
            <span style={{fontSize: 12}}>新增二级栏目</span>
          </Button>
        </Menu>
        <div className={styles.tableContainer}>
          {
            <div className={styles.tableHeader}>
              <h2>
                {
                  !secColEdit ?
                  <span>{secCol}</span>:
                  <Input style={{width: 100}} onChange={(e) => setSecCol(e.target.value)} defaultValue={secCol}/>
                }
              </h2>
              <div className={styles.oper}>
                {
                  !secColEdit ?
                  <>
                    <Button onClick={handleRenameClick}>重命名</Button>
                    <Button onClick={DelSecCol}>删除</Button>
                  </>:
                  <Button onClick={handleRenameSureClick}>确定</Button>
                }
              </div>
            </div>
          }
          <Table 
            columns={editState === "二级" ? secondaryColumn : columns} 
            dataSource={editState === "二级" ? articles : editData} 
            pagination={false}
          />
        </div>
      </div>
       <Button 
          type="primary"
          className={styles.submitBtn}
          loading = {loading}
          onClick = {() => setLoading(true)}
       >
         保存
       </Button>
    </React.Fragment>
  );
}




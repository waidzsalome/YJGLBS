import React, {useState,useEffect,useReducer} from "react";
import {Radio,Input,Icon,Table,Button,Menu,message} from "antd";
import styles from "./index.css";
import dataSource from "./dataSource";
import * as utils from "../../../utils/utils";
import axios from "axios";

export default function ColManage() {

  // 用与更新后端接口的临时变量
  const [colsData, setColsData] = useState([]);
  // 后端data
  const [data, setCols] = useState([]);
  //二级栏目文章列表
  const [articles, setArticles] = useState([]);
  //二级栏目列表
  const [secCols, setSecCols] = useState([]);
  // 待编辑的data
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(false);
  // 编辑一级和二级栏目
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
  // 暂时先用个变量控制weight输入框输入数值
  const [weightIsNum, setWeightIsNum] = useState([]);
  const [saveClick, setSaveClick] = useState(false);
  
  const renderRadio = (text, record, index) => {
    const State =
      !edit[index] && editState === "二级" ?
       <span>{articles[index].state}</span> :
       <Radio.Group className={styles.radioGroup} name="pageState" defaultValue={record.state ? 1 : 2} onChange={(e) => handleRadioChange(index, record, e)}>
        <Radio value={1} className={styles.radio}>显示</Radio>
        <Radio value={2} className={styles.radio}>隐藏</Radio>
      </Radio.Group>
    return State;
  }
  useEffect(() => {

    if(col && colsData.length!==0) {
      let _cols = colsData;
      let _col = _cols.find(item => {
        return item.title === col;
      });
      let _secCol = _col && _col.sec;
      setSecCols(_secCol);
    }
  }, [col, colsData, data]);
  useEffect(() => {
    // 后端数据渲染进data里
    axios.get("http://yjxt.elatis.cn/options/name/column").then(res => {
      if(res.data.code === 0) {
        let _weight = [];
        setColsData(res.data.data);
        setCols(res.data.data.map(item => {
          _weight.push(true);
          setWeightIsNum(_weight);
          return utils.sliceObj(item, ["key", "title", "state", "weight", "link"]);
        }));
        setCol((res.data.data)[0].title);
      }
    }).catch(err => {
      message.error(err);
    });
    // 根据secCol获取文章列表 path: 新闻中心/二级栏目1
    setArticles(dataSource.articles[0].articles);
    // useState()是异步的，需要后端能直接返回文章数量
    setEdit([false, false, false]);

  }, []);
  useEffect(() => {
    secCols.length !== 0 && setSecCol(secCols[0].col);
    setSecColKey(dataSource.secCols[0].key);

  }, [secCols, data]);
  useEffect(() => {
    if(!saveClick) return;
    if(colsData.length !== 0) {
      colsData.map((item)=> {
        let _item = {...item, title: item.newCol}
        delete item.newCol;
        return _item;
      });
      colsData.sort((a, b) => {
        return a.weight - b.weight;
      });
      const _data = JSON.stringify({
        name: "column",
        value: {
          ...colsData,
          title: colsData.newCol
        }
      })
      axios({
        method: "POST",
        url: "http://yjxt.elatis.cn/options/update",
        headers: {
          "token": "adminToken",
          "Content-Type": "application/json"
        },
        data: _data
      }).then(res => {
        if(res.data.code === 0) {
          setLoading(false);
          message.success("保存成功");
          window.location.reload();
          setSaveClick(false);
        }
      }).catch(err => {
        message.error(err);
      });
    }
  }, [colsData, saveClick]);

  const columns = [
    {
      title: "栏目",
      dataIndex: "title",
      key: "title", 
      className: `${styles.column}`,
      render: (text) => <span>{text}</span>
    },
    {
      title: "修改后的新栏目名",
      dataIndex: "newCol",
      key: "newCol",
      className: `${styles.column}`,
      render: (text,record,index) => <Input placeholder="请输入新栏目名" style={{width: "150px"}} onChange={(e) => handleColChange(e, "title", index)}/>
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
      render: (text,record,index) => <Input style={{width: "50px"}} onChange={(e) => handleColChange(e, "weight", index)} value={!weightIsNum[index] ? "" : editData[index].weight}/>
    },
    {
      title: "链接地址",
      dataIndex: "link",
      key: "link",
      className: `${styles.column}`,
      render: (text,record,index) => <Input placeholder="http://" onChange={(e) => handleColChange(e, "link", index)}/>
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
    setEditState("一级");
    setEditData([...data]);
  }
  const handleColClick = (item) => {
    setCol(item.title);
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
    let _value = e.target.value;
    if(editState === "二级" && _value !== (record.state ? 1 : 2)) {
       let article = articles[index];
       article = {...article, state: _value === 1 ? true : false};
       let arr = [...articles];
       arr.splice(index, 1, article);
       setArticles(arr);
    } else if(editState === "一级" && _value !== (record.state ? 1 : 2)) {
      let _cols = [...editData];
      let _col = _cols[index];
      _col = {..._col, state: _value === 1 ? true : false};
      _cols.splice(index, 1, _col);
      setEditData(_cols);
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
    _secCols[0] && setSecCol(_secCols[0].col);
    setSecColKey(_secCols[0].key);
  }
  const handleColChange = (e, id, index) => {
    
    let _value = id === "weight" ? parseInt(e.target.value) : e.target.value;
    let _weightIsNum = [...weightIsNum];
    console.log(_weightIsNum)
    _weightIsNum.splice(index, 1 ,true);
    setWeightIsNum(_weightIsNum);
    if(id === "weight" && Number.isNaN(_value)) {
      message.warn("权重只能输入数值");
      _weightIsNum.splice(index, 1, false);
      setWeightIsNum(_weightIsNum);
      return;
    }
    let _newCol = {
      [id]: _value
    }
    let _cols = [...editData];
    let _col = {..._cols[index], ..._newCol};
    _cols.splice(index, 1, _col);
    setEditData(_cols);
  }
  const handleSaveClick = () => {
    setLoading(true);
    setSaveClick(true);
    setColsData(editData);
  }
  return (
    <React.Fragment>
      <div style={{display: "flex",flexFlow: "row nowrap",marginTop: "20px"}}>
        <ul className={styles.list}>
          {
            data.map((item,index) => (
              <li className={styles.li} onClick={() => handleColClick(item)}>
                <a className={index<data.length-1 ? styles.navTextB : styles.navText}>{item.title}</a>
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
        {
          editState === "二级" &&
          <Menu
            style={{width: 130, height: 483}}        
            selectedKeys={[`${secColKey}`]}
            defaultSelectedKeys={["1"]}
            mode={"vertical"}
            theme={"dark"}
          >
            <div style={{height: 36, lineHeight: "36px"}}>{col}</div>
            {
              secCols.map(item => {
                return (
                  <Menu.Item key={item.key} onClick={handleSecColClick}>{item.title}</Menu.Item>
                );
              })
            }
            <Button type="primary" style={{width: 85, marginTop: 20, padding: 0}} onClick={handleAddSeColClick}>
              <span style={{fontSize: 12}}>新增二级栏目</span>
            </Button>
          </Menu>
        }
        <div className={styles.tableContainer}>
          {
            editState === "二级" &&
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
          onClick = {handleSaveClick}
       >
         保存
       </Button>
    </React.Fragment>
  );
}




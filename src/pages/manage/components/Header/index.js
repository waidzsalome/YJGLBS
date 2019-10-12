import React from 'react'
import styles from './index.css'
import  Link  from "umi/link";


const logOut = ()=> {
  console.log("logOut");
  //在这里写登出请求
}

export default function Header () {
  return (
      <div className={styles.header}>
        <Link to = "/manage" className = { styles.toHome }></Link>
        <Link to = "/manage/message" className = { styles.toIssue }></Link>
        <span className = { styles.userName }>{"用户名"}</span>
        <span className = { styles.logOut }  onClick = {()=>{logOut();}}></span>
      </div>
  );
}

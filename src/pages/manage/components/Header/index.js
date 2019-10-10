import React from 'react'
import styles from './index.css'
import  Link  from "umi/link";

export default function Header () {
  return (
      <div className={styles.header}>
        <Link to = "/" className = { styles.toHome }></Link>
        <Link to = "/" className = { styles.toIssue }></Link>
        <span className = { styles.userName }>{"用户名"}</span>
        <span className = { styles.logOut }></span>
      </div>
  );
}

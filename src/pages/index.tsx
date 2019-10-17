import React from 'react';
import styles from './index.css';

export default function() {
  if(sessionStorage.getItem("token")){
    window.location.href = "/manage";
  }
  else {
    window.location.href = "/login";
  }
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}


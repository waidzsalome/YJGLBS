import React from 'react'
import { Pagination as P } from 'antd'
import styles from "./index.css";

export default function Pagination () {
  return (
      <P
        className={styles.pagination}
        hideOnSinglePage
        onChange={onChange}
        defaultCurrent={1}
        defaultPageSize={20}
        total={200}
        showQuickJumper
      />
  )
}

function onChange (page) {
  console.log(page)
}

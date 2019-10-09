import React from "react";
import styles from "./index.css";
import { Button } from "antd";
import Link from "umi/link";

const FileHeader = ()=> {
    return(
        <div className = { styles.FileHeader }>
            <span>
                文件管理
            </span>
            <div >
                <Button >新建文件</Button>
                <div>
                    <ul>
                        <li>
                            <Link to = "/">新建文件夹</Link>
                        </li>
                        <li>
                            <Link to = "/">新建文档</Link>
                        </li>
                        <li>
                            <Link to = "/">新建图片</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}



const File = ()=> {
    return (
        <div>
            <FileHeader />
        </div>
    )
}
export default File;
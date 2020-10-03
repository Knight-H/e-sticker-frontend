import React, { useState } from "react";
import styles from './index.module.scss';

import { ReactComponent as Drawing } from '../approve-layout/drawing.svg';
import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';

const PreviewImageComponent = () => {
    return (
        <>
            <div className={styles.square}>
                <Drawing />
            </div>

            <div className={styles.inputBox}>
                <button><h3><IconCheckSVG /> อนุมัติแบบ</h3></button>
                <input className={styles.inputGreen} type="text" placeholder="พิมพ์ข้อความ..."></input>

                <div className={styles.groupBtn}>
                    <button type="button">ส่ง</button>
                    <button type="button" className={styles.btnCustomWidth}>อัพโหลดไฟล์</button>
                </div>
            </div>
        </>
    )
}

export default PreviewImageComponent;
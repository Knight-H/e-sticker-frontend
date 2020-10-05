import React, { useState } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';
import { ReactComponent as IconCircle } from '../order-1-product-config/icon-circle.svg';

const PreviewImageComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    console.log("values", values)
    const handleChange = event => {
        if (event.target.files) {
            // setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), false)
            alert(JSON.stringify(URL.createObjectURL(event.target.files[0]), null, 2));
        }
    }

    return (
        <>
            <div className={styles.square}>
                <article className={`${styles.newMsg} ${styles.flexEnd}`}>
                    <p className={styles.massage}>สวัสดีครับ</p>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>ลูกค้า</p>
                    </div>
                </article>
                <article className={`${styles.newMsg} ${styles.flexEnd}`}>
                    <p className={styles.massage}>กำลังส่งแบบให้นะครับ</p>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>ลูกค้า</p>
                    </div>
                </article>
                <article className={`${styles.newMsg} ${styles.flexStart}`}>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>พนักงาน</p>
                    </div>
                    <p className={styles.massage}>สวัสดีครับ</p>
                </article>
                <article className={`${styles.newMsg} ${styles.flexStart}`}>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>พนักงาน</p>
                    </div>
                    <p className={styles.massage}>กรุณางส่งแบบมาหน่อยครับ</p>
                </article>
                <article className={`${styles.newMsg} ${styles.flexStart}`}>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>พนักงาน</p>
                    </div>
                    <p className={styles.massage}>กรุณางส่งแบบมาหน่อยครับ</p>
                </article>
                <article className={`${styles.newMsg} ${styles.flexEnd}`}>
                    <p className={styles.massage}>สวัสดีครับ</p>
                    <div className={styles.groupUser}>
                        <IconCircle />
                        <p>ลูกค้า</p>
                    </div>
                </article>
            </div>

            <div className={styles.inputBox}>
                <button><h3><IconCheckSVG /> อนุมัติแบบ</h3></button>
                <Field name="massage" className={styles.inputGreen} type="text" placeholder="พิมพ์ข้อความ..." />

                <div className={styles.btnGroup}>
                    <button type="submit">ส่ง</button>
                    <input type="file" id="file" onChange={(e) => handleChange(e)} />
                    <label for="file" className={styles.btnCustomWidth}>อัพโหลดไฟล์</label>
                </div>
            </div>
        </>
    )
}

export default PreviewImageComponent;
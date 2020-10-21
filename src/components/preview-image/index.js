import React from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';
import { ReactComponent as IconCircle } from '../order-1-product-config/icon-circle.svg';

const PreviewImageComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = event => {
        if (event.target.files) {
            // setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), false)
            alert(JSON.stringify(URL.createObjectURL(event.target.files[0]), null, 2));
        }
    }

    if (values.itemsList.length >= 1) {
        return (
            <>
                <div className={styles.square}>
                    {values.itemsList[values.expandCard].messages.map((listMsg) => {
                        if (listMsg.type === "text") {
                            return (
                                <article className={`${styles.newMsg} ${listMsg.by === "customer" && styles.flexEnd}`}>
                                    {listMsg.by === "customer" ?
                                        <>
                                            <p className={styles.massage}>{listMsg.content}</p>
                                            <div className={styles.groupUser}>
                                                <IconCircle />
                                                <p>{listMsg.by}</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className={styles.groupUser}>
                                                <IconCircle />
                                                <p>{listMsg.by}</p>
                                            </div>
                                            <p className={styles.massage}>{listMsg.content}</p>
                                        </>
                                    }
                                </article>//<img src={listMsg.content} alt="content" />
                            )
                        } else if (listMsg.type === "file") {
                            return (
                                <article className={`${styles.newMsg} ${listMsg.by === "customer" && styles.flexEnd}`}>
                                    {listMsg.by === "customer" ?
                                        <>
                                            <p className={styles.massage}>
                                                <label className={styles.fileMsg}>ตัวอย่างงาน.png</label>
                                                <a className={styles.dowloadFileMsg} href={listMsg.content} target="_blank" downloadFile>ดาวน์โหลด.</a>
                                            </p>
                                            <div className={styles.groupUser}>
                                                <IconCircle />
                                                <p>{listMsg.by}</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className={styles.groupUser}>
                                                <IconCircle />
                                                <p>{listMsg.by}</p>
                                            </div>
                                            <p className={styles.massage}>
                                                <label className={styles.fileMsg}>ตัวอย่างงาน.ai</label>
                                                <span className={styles.dowloadFileMsg}>ดาวน์โหลด.</span>
                                            </p>
                                        </>
                                    }
                                </article>
                            )
                        }
                    })}
                </div>

                <div className={styles.inputBox}>
                    {`${values.itemsList[values.expandCard].approveMethod}` === `รออนุมัติแบบ` &&
                        <button type="button" onClick={() => alert(values.orderID.listOrder[values.expandCard].status)}><h3><IconCheckSVG /> อนุมัติแบบ</h3></button>}
                    <Field name="massage" className={styles.inputGreen} type="text" placeholder="พิมพ์ข้อความ..." />

                    <div className={styles.btnGroup}>
                        <button type="button" onClick={() => alert(values.massage)}>ส่ง</button>
                        <input type="file" id="file" onChange={(e) => handleChange(e)} />
                        <label for="file" className={styles.btnCustomWidth}>อัพโหลดไฟล์</label>
                    </div>
                </div>
            </>
        )
    } else {
        return <div></div>
    }
}

export default PreviewImageComponent;
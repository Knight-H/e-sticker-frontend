import React from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import { useFormikContext } from 'formik';
import axios from "axios";

import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';
import { ReactComponent as IconCircle } from '../order-1-product-config/icon-circle.svg';

const PreviewImageComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue("uploadFileStrickerForFirebase", event.target.files[0], false);
            setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), true);
        }
    }

    const sendMessage = () => {
        if (values.massage) {
            let data = {
                "itemIndex": 0,
                "messages": [
                    ...values.itemsList[values.expandCard].messages,
                    {
                        "by": "customer",
                        "content": values.massage,
                        // "timestamp": "5 Oct 2020",
                        "type": "text"
                    }
                ]
            }
            setFieldValue("massage", '', false)
            console.log("values.myID", values.myID)
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/order/${values.myID}`, data)
                .then(res => {
                    console.log("res", res);
                }).catch(function (err) {
                    console.log("err", err)
                })
        } else {

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
                        } else {
                            return (
                                <article className={`${styles.newMsg} ${listMsg.by === "customer" && styles.flexEnd}`}>
                                    {listMsg.by === "customer" ?
                                        <>
                                            <p className={styles.massage}>
                                                <label className={styles.fileMsg}>ตัวอย่างงาน.png</label>
                                                <a className={styles.dowloadFileMsg} href={listMsg.content} downloadFile>ดาวน์โหลด.</a>
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
                        <button type="button" onClick={() => sendMessage()}>ส่ง</button>
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
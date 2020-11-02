import React from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import { useFormikContext } from 'formik';
import axios from "axios";
import firebaseApp from '../../firebase/index.js';
import { auth } from '../../firebase/index.js';

import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';
import { ReactComponent as IconCircle } from '../order-1-product-config/icon-circle.svg';

const PreviewImageComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = event => {
        if (event.target.files) {
            const storageRef = firebaseApp.storage().ref();
            let timeStamp = new Date().toISOString().slice(0, 10)
            let file = event.target.files[0];

            auth.onAuthStateChanged(user => {
                if (user) {// User is signed in.
                    storageRef.child(`${user.uid}/${timeStamp}-${file.name}`).put(file)
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {

                                let data = {
                                    "itemIndex": values.expandCard,
                                    "msg": {
                                        "by": "customer",
                                        "content": url,
                                        // "timestamp": "5 Oct 2020",
                                        "info": `${file.name}`,
                                        "type": "file"
                                    }
                                }

                                axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orderItemMsg/${values.myID}`, data)
                                    .then(res => {
                                        console.log("res", res);
                                        setFieldValue("fetchMsg", true, false);
                                    }).catch(function (err) {
                                        console.log("err", err)
                                    })

                            });
                        });
                }
            })

        }
    }

    const sendMessage = () => {
        if (values.massage) {
            let data = {
                "itemIndex": values.expandCard,
                "msg": {
                    "by": "customer",
                    "content": values.massage,
                    // "timestamp": "5 Oct 2020",
                    "type": "text"
                }
            }
            setFieldValue("massage", '', false)
            // console.log("values.myID", values.myID)
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orderItemMsg/${values.myID}`, data)
                .then(res => {
                    console.log("res", res);
                    setFieldValue("fetchMsg", true, false);
                }).catch(function (err) {
                    console.log("err", err)
                })
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
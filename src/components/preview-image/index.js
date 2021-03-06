import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';
import axios from "axios";
import firebaseApp from '../../firebase/index.js';
import { auth } from '../../firebase/index.js';

import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';
import { ReactComponent as IconCircle } from '../order-1-product-config/icon-circle.svg';
import logoKbank from './kbank.jpg';
import { ReactComponent as IconUploadFile } from '../order-2-upload-file-config/icon-upload-file.svg';

const PreviewImageComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    const [modal, setModal] = useState(false);

    const handleChange = event => {
        setFieldValue("waitProcess", true, false);
        setFieldValue("loading", true, false);

        if (event.target.files) {
            const storageRef = firebaseApp.storage().ref();
            let timeStamp = new Date().toISOString().slice(0, 10)
            let file = event.target.files[0];
            let windowUrl = window.location.pathname;
            auth.onAuthStateChanged(user => {
                if (user) {// User is signed in.
                    storageRef.child(`${user.uid}/${timeStamp}-${file.name}`).put(file)
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {

                                let data = {
                                    "itemIndex": values.expandCard,
                                    "msg": {
                                        "by": windowUrl.search("admin") !== -1 ? "admin" : "customer",
                                        "content": url,
                                        // "timestamp": "5 Oct 2020",
                                        "info": `${file.name}`,
                                        "type": "file"
                                    }
                                }
                                console.log("data", data)
                                axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orderItemMsg/${values.myID}`, data, {
                                    headers: {
                                      Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                                    }
                                   })
                                    .then(res => {
                                        console.log("res", res);
                                        setFieldValue("fetchMsg", true, false);
                                        setFieldValue("waitProcess", false, false);
                                        setFieldValue("loading", false, false);

                                    }).catch(function (err) {
                                        console.log("err", err)
                                        setFieldValue("waitProcess", false, false);
                                        setFieldValue("loading", false, false);

                                    })

                            });
                        });
                }
            })

        }
    }

    const sendMessage = () => {
        setFieldValue("waitProcess", true, false);
        setFieldValue("loading", true, false);

        if (values.massage) {
            let url = window.location.pathname;
            let data = {
                "itemIndex": values.expandCard,
                "msg": {
                    "by": url.search("admin") !== -1 ? "admin" : "customer",
                    "content": values.massage,
                    // "timestamp": "5 Oct 2020",
                    "type": "text"
                }
            }
            setFieldValue("massage", '', false)
            // console.log("values.myID", values.myID)
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orderItemMsg/${values.myID}`, data, {
                headers: {
                  Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                }
               })
                .then(res => {
                    console.log("res", res);
                    setFieldValue("fetchMsg", true, false);
                    setFieldValue("waitProcess", false, false);
                    setFieldValue("loading", false, false);

                }).catch(function (err) {
                    console.log("err", err)
                    setFieldValue("waitProcess", false, false);
                    setFieldValue("loading", false, false);

                })
        }
    }

    const sendItemStatus = () => {
        setFieldValue("waitProcess", true, false);
        setFieldValue("loading", true, false);

        let data = {
            "itemIndex": values.expandCard,
            "status": "อนุมัติแบบ"
        }
        setFieldValue("massage", '', false)
        console.log("data", data)
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orderItemStatus/${values.myID}`, data, {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           })
            .then(res => {
                console.log("res", res);
                setFieldValue("fetchMsg", true, false);
                setFieldValue("waitProcess", false, false);
                setFieldValue("loading", false, false);
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("waitProcess", false, false);
                setFieldValue("loading", false, false);
            })
    }

    const handleChangeModal = event => {
        if (event.target.files) {
            setFieldValue("photo", event.target.files[0], true);
            setFieldValue("isCheckphoto", true, false);
        }
    }

    useEffect(() => {
        setFieldValue("name", values.shippingAddress ? values.shippingAddress.fullname : '')
        setFieldValue("phone", values.shippingAddress ? values.shippingAddress.phone : '')
        setFieldValue("amount", values.totalCost ? values.totalCost : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);

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
                                                <label className={styles.fileMsg}>{listMsg.info}</label>
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
                                                <label className={styles.fileMsg}>{listMsg.info}</label>
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
                    {`${values.paymentMethod}` === `transfer_money` && `${values.paymentStatus}` === `pending` ?
                        <button type="button" onClick={() => setModal(true)} disabled={values.waitProcess ? true : false}>
                            <h3>แจ้งชำระเงิน</h3>
                        </button>
                        : `${values.itemsList[values.expandCard].status}` === `รออนุมัติแบบ` &&
                        <button type="button" onClick={() => sendItemStatus()} disabled={values.waitProcess ? true : false}>
                            <h3><IconCheckSVG /> อนุมัติแบบ</h3>
                        </button>}

                    <Field name="massage" className={styles.inputGreen} type="text" placeholder="พิมพ์ข้อความ..." disabled={values.waitProcess ? true : false} />

                    <div className={styles.btnGroup}>
                        <button type="button" onClick={() => sendMessage()} disabled={values.waitProcess ? true : false}>ส่ง</button>
                        <input type="file" id="file" onChange={(e) => handleChange(e)} disabled={values.waitProcess ? true : false}/>
                        <label for="file" className={styles.btnCustomWidth}>อัพโหลดไฟล์</label>
                    </div>

                    {/* <!-- The Modal --> */}
                    <div className={styles.modal} style={modal ? { display: "block" } : { display: "none" }}>
                        <div className={styles.modalContent}>
                            <div className={styles.exampleSticker}>
                                ยืนยันการชำระเงิน
                        </div>

                            <Form>
                                <div className={styles.groupColumn}>
                                    <div className={styles.leftColumn}>
                                        <p>ชื่อ นามสกุล*<ErrorMessage name="name" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="name" type="text" disabled={values.waitProcess ? true : false}/>
                                        <p>ยอดชำระเงิน<ErrorMessage name="amount" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="amount" type="text" disabled={values.waitProcess ? true : false}/>
                                    </div>

                                    <div className={styles.rightColumn}>
                                        <p>เบอร์โทรศัพท์*<ErrorMessage name="phone" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="phone" type="text" disabled={values.waitProcess ? true : false}/>
                                        <p>สลิปการโอนเงิน*<ErrorMessage name="photo" render={msg => <span className="error">{msg}</span>} />
                                            {values.isCheckphoto !== 0 ? values.isCheckphoto ? 
                                            <span style={{ color: "#009473", fontSize: "12px" }}>อัพโหลดสำเร็จ</span> :
                                                <span style={{ color: "red", fontSize: "12px" }}>อัพโหลดไม่สำเร็จ</span> : ""}
                                                </p>
                                        <input type="file" id="file2" onChange={(e) => handleChangeModal(e)} disabled={values.waitProcess ? true : false}/>
                                        <label for="file2" className={`${styles.buttonUploadFile} ${styles.label}`}>
                                            <IconUploadFile />อัพโหลดไฟล์</label>
                                    </div>
                                </div>

                                <div className={styles.groupColumn}>
                                    <p>ธนาคารที่โอน<ErrorMessage name="bank" render={msg => <span className="error">{msg}</span>} /></p>
                                    <button className={`${styles.bankPayment} ${values.bank === "kbank" && styles.active}`} type="button"
                                     onClick={() => setFieldValue("bank", "kbank", true)} disabled={values.waitProcess ? true : false}>
                                        <img src={logoKbank} className={styles.imgBank} />
                                        <div className={styles.groupBankDetail}>
                                            <p>กสิกรไทย</p>
                                            <p> 123-4-567-8910</p>
                                            <p>บริษัท Digital wish จำกัด</p>
                                        </div>
                                    </button>
                                </div>

                                <div className={styles.groupColumn2}>
                                    <div className={styles.leftColumn}>
                                        <p>วันที่โอน<ErrorMessage name="date" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="date" type="date" disabled={values.waitProcess ? true : false} />
                                    </div>
                                    <div className={styles.rightColumn}>
                                        <p>เวลา<ErrorMessage name="time" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="time" type="time" style={{ width: "170px" }} disabled={values.waitProcess ? true : false} />
                                    </div>
                                </div>

                                <button type="submit" className={styles.btnGreenModal} disabled={values.waitProcess ? true : false}>ตกลง</button>
                                <button type="button" className={styles.btnGreenModal} onClick={() => setModal(false)} disabled={values.waitProcess ? true : false}>ปิด</button>
                            </Form>
                        </div>

                    </div>

                </div>
            </>
        )
    } else {
        return <div></div>
    }
}

export default PreviewImageComponent;
import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";

const ModalShipping = ({ values, setFieldValue }) => {

    useEffect(() => {
        let shippingOptioned = values.shippingOption.find(shippingOption => `${shippingOption.myID}` === `${values.shippingID}`)
        if (shippingOptioned && values.shippingID) {
            setFieldValue(`${values.modalShipping}Courier`, shippingOptioned.courier, false);
            setFieldValue(`${values.modalShipping}Duration`, shippingOptioned.duration, false);
            setFieldValue(`${values.modalShipping}Rate`, shippingOptioned.rate, false);
        } else {
            setFieldValue(`${values.modalShipping}Courier`, "", false);
            setFieldValue(`${values.modalShipping}Duration`, "", false);
            setFieldValue(`${values.modalShipping}Rate`, "", false);
        }
    }, [values.shippingID]);

    const addOptionShipping = () => {
        setFieldValue("loading", true, false);
        let data = {
            "courier": values[`${values.modalShipping}Courier`],
            "duration": values[`${values.modalShipping}Duration`],
            "rate": values[`${values.modalShipping}Rate`]
        }
        // console.log(data)
        axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions`, data)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalShipping", '', false)
                setFieldValue("loading", false, false);
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);
            })
    }

    const editOptionShipping = () => {
        setFieldValue("loading", true, false);
        let data = {
            "courier": values[`${values.modalShipping}Courier`],
            "duration": values[`${values.modalShipping}Duration`],
            "rate": values[`${values.modalShipping}Rate`]
        }
        // console.log(data)
         axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions/${values.shippingID}`, data)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("loading", false, false);
                setFieldValue("modalShipping", '', false);
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);
            })
    }

    const removeOptionShipping = () => {
        setFieldValue("loading", true, false);
         axios.delete(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions/${values.shippingID}`)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("loading", false, false);
                setFieldValue("modalShipping", '', false);
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);
            })
    }

    return (
        <div className={styles.modal} style={{ display: values.modalShipping ? "block" : "none" }}>
            <div className={styles.modalContent}>
                <div>
                    <span className={styles.close} onClick={() => {
                        setFieldValue("modalShipping", "", false);
                        setFieldValue("shippingID", "", false);
                    }}>&times;</span>
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalShipping}Courier`} className={styles.text} placeholder="ผู้จัดส่ง" />
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalShipping}Duration`} className={styles.text} placeholder="ระยะเวลาการจัดส่ง" />
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalShipping}Rate`} className={styles.text} placeholder="ราคา" />
                </div>
                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                    {!values.shippingID ? null : <button type="button" className={styles.removeOption} onClick={() => removeOptionShipping()}>ลบ</button>}
                    <button type="button" className={styles.addOption} onClick={() => !values.shippingID ? addOptionShipping() : editOptionShipping()}>บันทึก</button>
                </div>
            </div>
        </div>
    )
}

export default ModalShipping;
import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";

const ModalShipping = ({ values, setFieldValue }) => {

    // useEffect(() => {
    //     let shippingOptioned = values.shippingOption.find(shippingOption => `${shippingOption.myID}` === `${values.shippingID}`)
    //     if (shippingOptioned && values.shippingID) {
    //         setFieldValue(`${values.modalQuality}Courier`, shippingOptioned.courier, false);
    //         setFieldValue(`${values.modalQuality}Duration`, shippingOptioned.duration, false);
    //         setFieldValue(`${values.modalQuality}Rate`, shippingOptioned.rate, false);
    //     } else {
    //         setFieldValue(`${values.modalQuality}Courier`, "", false);
    //         setFieldValue(`${values.modalQuality}Duration`, "", false);
    //         setFieldValue(`${values.modalQuality}Rate`, "", false);
    //     }
    // }, [values.shippingID]);

    const addOptionQuality = () => {
        let data = {
            "count_list": values[`${values.modalQuality}Count`]
        }
        console.log(data)
        axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, data)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalQuality", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    // const editOptionShipping = () => {
    //     let data = {
    //         "courier": values[`${values.modalQuality}Courier`],
    //         "duration": values[`${values.modalQuality}Duration`],
    //         "rate": values[`${values.modalQuality}Rate`]
    //     }
    //     // console.log(data)
    //      axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions/${values.shippingID}`, data)
    //         .then(res => {
    //             setFieldValue("fetch", true, false);
    //             setFieldValue("modalQuality", '', false);
    //         }).catch(function (err) {
    //             console.log("err", err)
    //         })
    // }

    // const removeOptionShipping = () => {
    //      axios.delete(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions/${values.shippingID}`)
    //         .then(res => {
    //             setFieldValue("fetch", true, false);
    //             setFieldValue("modalQuality", '', false);
    //         }).catch(function (err) {
    //             console.log("err", err)
    //         })
    // }

    return (
        <div className={styles.modal} style={{ display: values.modalQuality ? "block" : "none" }}>
            <div className={styles.modalContent}>
                <div>
                    <span className={styles.close} onClick={() => {
                        setFieldValue("modalQuality", "", false);
                        setFieldValue("shippingID", "", false);
                    }}>&times;</span>
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalQuality}Count`} type="number" className={styles.text} placeholder="จำนวน" />
                </div>
                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                <button type="button" className={styles.addOption} onClick={() => addOptionQuality()}>บันทึก</button>
                    {/* {!values.shippingID ? null : <button type="button" className={styles.removeOption} onClick={() => removeOptionShipping()}>ลบ</button>}
                    <button type="button" className={styles.addOption} onClick={() => !values.shippingID ? addOptionShipping() : editOptionShipping()}>บันทึก</button> */}
                </div>
            </div>
        </div>
    )
}

export default ModalShipping;
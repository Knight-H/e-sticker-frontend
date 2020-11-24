import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";

const ModalShipping = ({ values, setFieldValue }) => {

    useEffect(() => {
        if (values.qualityID || values.qualityID === 0) {
            setFieldValue(`${values.modalQuality}Count`, values.unitOptions[values.qualityID], false);
        } else {
            setFieldValue(`${values.modalQuality}Count`, "", false);
        }
    }, [values.qualityID]);

    const addOptionQuality = () => {
        let data = values[`${values.modalQuality}Count`];

        values.unitOptions.push(data);

        let dataPost = {
            "count_list": values.unitOptions
        }
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, dataPost)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalQuality", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    const editOptionQuality = () => {
        values.unitOptions[values.qualityID] = values[`${values.modalQuality}Count`]

        let dataPost = {
            "count_list": values.unitOptions
        }
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, dataPost)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalQuality", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    const removeOptionQuality = () => {
        values.unitOptions.splice(values.qualityID, 1);
        let dataPost = {
            "count_list": values.unitOptions
        }

        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, dataPost)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalQuality", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    return (
        <div className={styles.modal} style={{ display: values.modalQuality ? "block" : "none" }}>
            <div className={styles.modalContent}>
                <div>
                    <span className={styles.close} onClick={() => {
                        setFieldValue("modalQuality", "", false);
                        setFieldValue("qualityID", "", false);
                    }}>&times;</span>
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalQuality}Count`} type="number" className={styles.text} placeholder="จำนวน" />
                </div>
                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                    {values.qualityID || values.qualityID === 0 ?
                        <button type="button" className={styles.removeOption} onClick={() => removeOptionQuality()}>ลบ</button> :
                        null}
                    <button type="button" className={styles.addOption} onClick={() => values.qualityID || values.qualityID === 0 ? editOptionQuality() : addOptionQuality()}>บันทึก</button>
                </div>
            </div>
        </div>
    )
}

export default ModalShipping;
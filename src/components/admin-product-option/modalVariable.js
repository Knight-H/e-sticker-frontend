import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";

const ModalShipping = ({ values, setFieldValue }) => {

    const addOptionVariable = () => {
        let dataPost = {
            "fixed_cost": values[`${values.modalVariable}Fixed`],
            "variable_cost_1": values[`${values.modalVariable}Variable1`],
            "variable_cost_2": values[`${values.modalVariable}Variable2`]
        }
        values.material[values.materialSelected].coating_list[values.coatingSelected].price = dataPost;

        let dataPostNew = {
            "material_list": values.material
        }
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPostNew)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalVariable", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    return (
        <div className={styles.modal} style={{ display: values.modalVariable ? "block" : "none" }}>
            <div className={styles.modalContent}>
                <div>
                    <span className={styles.close} onClick={() => {
                        setFieldValue("modalVariable", "", false);
                        setFieldValue("variableID", "", false);
                    }}>&times;</span>
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalVariable}Fixed`} className={styles.text} placeholder="Fix Cost" />
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalVariable}Variable1`} className={styles.text} placeholder="Variable 1" />
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalVariable}Variable2`} className={styles.text} placeholder="Variable 2" />
                </div>
                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                    <button type="button" className={styles.addOption} onClick={() => addOptionVariable()}>บันทึก</button>
                </div>
            </div>
        </div>
    )
}

export default ModalShipping;
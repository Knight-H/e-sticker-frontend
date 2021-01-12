import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";

const ModalShipping = ({ values, setFieldValue }) => {

    useEffect(() => {
        if (values.variableID || values.variableID === 0) {
            setFieldValue(`${values.modalVariable}Fixed`, values.material[values.materialSelected].coating_list[values.coatingSelected].price.fixed_cost, false);
            setFieldValue(`${values.modalVariable}Variable1`, values.material[values.materialSelected].coating_list[values.coatingSelected].price.variable_cost_1, false);
            setFieldValue(`${values.modalVariable}Variable2`, values.material[values.materialSelected].coating_list[values.coatingSelected].price.variable_cost_2, false);
        } else {
            setFieldValue(`${values.modalVariable}Fixed`, "", false);
            setFieldValue(`${values.modalVariable}Variable1`, "", false);
            setFieldValue(`${values.modalVariable}Variable2`, "", false);
        }
    }, [values.variableID]);

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
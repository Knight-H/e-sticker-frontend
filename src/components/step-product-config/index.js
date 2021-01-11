import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCorrect } from './icon-correct.svg';

const StepProductConfigComponent = (props) => {
    const [selectStep] = useState(1);
    const { values, setFieldValue } = useFormikContext();

    return (
        <section className={styles.stepProgressProductConfig}>
            <h4 className={styles.titleProductConfig}>รูปแบบสติกเกอร์</h4>
            <p className={styles.detailProductConfig}>{
                values.shape ? <><IconCorrect />{values.shape}</> : '-'
            }</p>
            <h4 className={styles.titleProductConfig}>เนื้อวัสดุ</h4>
            <p className={styles.detailProductConfig}>{
                values.material ? <><IconCorrect />{values.material}</> : '-'
            }</p>
            <h4 className={styles.titleProductConfig}>การเคลือบผิว</h4>
            <p className={styles.detailProductConfig}>{
                values.coat ? <><IconCorrect />{values.coat}</> : '-'
            }</p>
            <h4 className={styles.titleProductConfig}>ขนาด</h4>
            <p className={styles.detailProductConfig}>{
                values.height || values.width ? <><IconCorrect />{values.width}cm. X {values.height}cm.</> : '-'
            }</p>
            <h4 className={styles.titleProductConfig}>จำนวน</h4>
            <p className={styles.detailProductConfig}>{
                values.units ? <><IconCorrect />{values.units} ชิ้น</> : '-'
            }</p>
            <p>รวม</p>
            <h3 className={styles.priceProductConfig}>{values.price} บาท</h3>

            {values.stepProgress !== 0 &&
                <button type="button" className={styles.nextButton} 
                onClick={() => setFieldValue("stepProgress", values.stepProgress - 1, false)}>ย้อนกลับ</button>
            }

        </section>
    )
}

export default StepProductConfigComponent;
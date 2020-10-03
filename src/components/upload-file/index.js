import React, { useState } from "react";
import styles from './index.module.scss';
import { useFormikContext } from 'formik';

import StepProgress from "../step_progress";

import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import { ReactComponent as IconCheckSVG } from './icon-check.svg';

import IconCheck from './icon-check.png';

import RadioInput from '../common/formik-radio-input';

const UploadFileComponent = (props) => {
    const { values, setFieldValue, validateForm, setTouched, setErrors } = useFormikContext();
    const [selectStep] = useState(2);

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), false)
        }
    }

    return (
        <main>
            <section style={{ display: "flex" }}>
                <StepProgress stepIndex={selectStep} />
            </section>
            <section className={styles.wrapContent}>
                <img src={values.uploadFileStricker} className={styles.square} alt="." />

                <div className={styles.rightContent}>
                    <label className={styles.label}>อนุมัติรูปแบบงาน</label>
                    <div className={styles.selectBox}>
                        <div className={styles.selectBoxCurrent} tabindex="1">
                            <div className={styles.selectBoxValue}>
                                <RadioInput name="approvalStricker" value="1" id="1"
                                    className={styles.selectBoxInput}
                                    checked={`${values.approvalStricker}` === `${1}` ? true : false} />
                                <p className={styles.selectBoxInputText}><IconCheckSVG className={styles.positionIcon} />ต้องการอนุมัติ</p>
                            </div>

                            <div className={styles.selectBoxValue}>
                                <RadioInput name="approvalStricker" id="0" value="0"
                                    className={styles.selectBoxInput}
                                    checked={`${values.approvalStricker}` === `${0}` ? true : false} />
                                <p className={styles.selectBoxInputText}>กรุณาเลือก...</p>
                                <IconArrow />
                            </div>
                        </div>
                        <ul className={styles.selectBoxList}>
                            <li>
                                <label className={styles.selectBoxOption} for="1"><img src={IconCheck} width="16px" style={{ marginRight: "10px" }} alt="." />ต้องการอนุมัติ</label>
                            </li>
                            <li>
                                <label className={styles.selectBoxOption} for="0">กรุณาเลือก...</label>
                            </li>
                        </ul>
                    </div>

                    <label className={styles.label} style={{ marginTop: "10px" }}>อัพโหลดไฟล์งาน</label>

                    <input type="file" id="file" onChange={(e) => handleChange(e)} />
                    <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>
                        <IconUploadFile />
                    อัพโหลดไฟล์
                    </label>

                    <label className={styles.label}>เพิ่มเติม</label>

                    <button type="submit" className={styles.btnCart}
                        onClick={() => {
                            if (!values.uploadFileStricker && !values.approvalStricker) {
                                setFieldValue("stepProgress", 2, false)
                            } else {
                                
                            }
                        }
                        }><IconCart /><b>ใส่ในตะกร้า</b></button>
                </div>
            </section>
        </main>
    );
};

export default UploadFileComponent;